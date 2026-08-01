const { createFile } = require('../lib/appwrite/storage');
const { getAppwriteConfig } = require('../lib/appwrite/client');

async function uploadFileHandler(req, res) {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const file = req.files.file;
    const bucketKey = req.body.bucket || 'projectImages';
    const config = getAppwriteConfig();
    const bucketId = config.bucketIds[bucketKey] || config.bucketIds.projectImages;

    const result = await createFile(
      bucketId,
      file.data,
      file.name,
      file.mimetype,
      ['read("any")'],
      null
    );

    const fileId = result.$id || result.id || result.fileId;
    const endpoint = config.endpoint.endsWith('/') ? config.endpoint : `${config.endpoint}/`;
    const url = `${endpoint}storage/buckets/${bucketId}/files/${fileId}/view?project=${config.projectId}`;

    res.status(201).json({
      success: true,
      data: {
        fileId,
        url,
        name: file.name,
        mimeType: file.mimetype,
        size: file.size,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'File upload failed.' });
  }
}

module.exports = { uploadFileHandler };
