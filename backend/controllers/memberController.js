const { listMembers, createMember, getMember, updateMember, getMemberByEmail } = require('../services/memberService');

async function getMembers(req, res) {
  try {
    const members = await listMembers();
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createMemberHandler(req, res) {
  try {
    const member = await createMember(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getMemberHandler(req, res) {
  try {
    const member = await getMember(req.params.id);
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateMemberHandler(req, res) {
  try {
    const member = await updateMember(req.params.id, req.body);
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getProfileHandler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No session token provided.' });
    }
    const { getAccount } = require('../lib/appwrite/auth');
    const sessionToken = authHeader.replace('Bearer ', '');
    const account = await getAccount(sessionToken);

    // Try to find member by email from Appwrite account
    let member = null;
    if (account && account.email) {
      member = await getMemberByEmail(account.email);
    }

    res.json({
      success: true,
      data: {
        account,
        member: member || null,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Session expired or invalid.' });
  }
}

module.exports = {
  getMembers,
  createMemberHandler,
  getMemberHandler,
  updateMemberHandler,
  getProfileHandler,
};
