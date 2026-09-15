  const { name, date, location, description, eventType, bannerImage, videoUrl, registrationLink, maxParticipants, status } = req.body;
function sendValidationError(res, errors) {
  return res.status(400).json({
    success: false,
    message: "Invalid request payload",
    errors,
  });
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringOrArray(value) {
  return (
    typeof value === "string" ||
    (Array.isArray(value) && value.every((item) => typeof item === "string"))
  );
}

function validateEmail(value) {
  return isNonEmptyString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateUrl(value) {
  if (!isNonEmptyString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
}

function validateProjectPayload(req, res, next) {
  const { title, description, projectImage, teamMembers, createdBy, status } = req.body;
  const errors = [];

  if (!isNonEmptyString(title)) {
    errors.push({ field: "title", message: "Title is required." });
  }
  if (!isNonEmptyString(description)) {
    errors.push({ field: "description", message: "Description is required." });
  }
  if (projectImage && !validateUrl(projectImage)) {
    errors.push({ field: "projectImage", message: "Project image must be a valid URL." });
  }
  if (teamMembers && !isStringOrArray(teamMembers)) {
    errors.push({ field: "teamMembers", message: "Team members must be a comma-separated string or string array." });
  }
  if (createdBy && typeof createdBy !== "string") {
    errors.push({ field: "createdBy", message: "Created by must be a string." });
  }
  if (status && typeof status !== "string") {
    errors.push({ field: "status", message: "Status must be a string." });
  }

  if (errors.length) {
    return sendValidationError(res, errors);
  }

  next();
}

function validateProjectUpdate(req, res, next) {
  const { title, description, projectImage, teamMembers, createdBy, status } = req.body;
  const errors = [];

  if (title !== undefined && !isNonEmptyString(title)) {
    errors.push({ field: "title", message: "Title must be a non-empty string." });
  }
  if (description !== undefined && !isNonEmptyString(description)) {
    errors.push({ field: "description", message: "Description must be a non-empty string." });
  }
  if (projectImage !== undefined && projectImage !== "" && !validateUrl(projectImage)) {
    errors.push({ field: "projectImage", message: "Project image must be a valid URL." });
  }
  if (teamMembers !== undefined && !isStringOrArray(teamMembers)) {
    errors.push({ field: "teamMembers", message: "Team members must be a comma-separated string or string array." });
  }
  if (createdBy !== undefined && typeof createdBy !== "string") {
    errors.push({ field: "createdBy", message: "Created by must be a string." });
  }
  if (status !== undefined && typeof status !== "string") {
    errors.push({ field: "status", message: "Status must be a string." });
  }

  if (errors.length) {
    return sendValidationError(res, errors);
  }

  next();
}

function validatePartnerPayload(req, res, next) {
  const { name, website, description, logo, category, status } = req.body;
  const errors = [];

  if (!isNonEmptyString(name)) {
    errors.push({ field: "name", message: "Name is required." });
  }
  if (!isNonEmptyString(website) || !validateUrl(website)) {
    errors.push({ field: "website", message: "Website is required and must be a valid URL." });
  }
  if (!isNonEmptyString(description)) {
    errors.push({ field: "description", message: "Description is required." });
  }
  if (logo !== undefined && logo !== "" && !validateUrl(logo)) {
    errors.push({ field: "logo", message: "Logo must be a valid URL." });
  }
  if (category !== undefined && typeof category !== "string") {
    errors.push({ field: "category", message: "Category must be a string." });
  }
  if (status !== undefined && typeof status !== "string") {
    errors.push({ field: "status", message: "Status must be a string." });
  }

  if (errors.length) {
    return sendValidationError(res, errors);
  }

  next();
}

function validatePartnerUpdate(req, res, next) {
  const { name, website, description, logo, category, status } = req.body;
  const errors = [];

  if (name !== undefined && !isNonEmptyString(name)) {
    errors.push({ field: "name", message: "Name must be a non-empty string." });
  }
  if (website !== undefined && website !== "" && !validateUrl(website)) {
    errors.push({ field: "website", message: "Website must be a valid URL." });
  }
  if (description !== undefined && !isNonEmptyString(description)) {
    errors.push({ field: "description", message: "Description must be a non-empty string." });
  }
  if (logo !== undefined && logo !== "" && !validateUrl(logo)) {
    errors.push({ field: "logo", message: "Logo must be a valid URL." });
  }
  if (category !== undefined && typeof category !== "string") {
    errors.push({ field: "category", message: "Category must be a string." });
  }
  if (status !== undefined && typeof status !== "string") {
    errors.push({ field: "status", message: "Status must be a string." });
  }

  if (errors.length) {
    return sendValidationError(res, errors);
  }

  next();
}

function validateEventPayload(req, res, next) {
  const { name, date, location, description, eventType, bannerImage, registrationLink, maxParticipants, status } = req.body;
  const errors = [];

  if (!isNonEmptyString(name)) {
    errors.push({ field: "name", message: "Event name is required." });
  }
  if (!isNonEmptyString(date)) {
    errors.push({ field: "date", message: "Date is required." });
  }
  if (!isNonEmptyString(location)) {
    errors.push({ field: "location", message: "Location is required." });
  }
  if (!isNonEmptyString(description)) {
    errors.push({ field: "description", message: "Description is required." });
  }
  if (eventType !== undefined && typeof eventType !== "string") {
    errors.push({ field: "eventType", message: "Event type must be a string." });
  }
  if (bannerImage !== undefined && bannerImage !== "" && !validateUrl(bannerImage)) {
    errors.push({ field: "bannerImage", message: "Banner image must be a valid URL." });
  }
  if (videoUrl !== undefined && videoUrl !== "" && !validateUrl(videoUrl)) {
    errors.push({ field: "videoUrl", message: "Video URL must be a valid URL." });
  }
  if (registrationLink !== undefined && registrationLink !== "" && !validateUrl(registrationLink)) {
    errors.push({ field: "registrationLink", message: "Registration link must be a valid URL." });
  }
  if (maxParticipants !== undefined && typeof maxParticipants !== "number") {
    errors.push({ field: "maxParticipants", message: "Max participants must be a number." });
  }
  if (status !== undefined && typeof status !== "string") {
    errors.push({ field: "status", message: "Status must be a string." });
  }

  if (errors.length) {
    return sendValidationError(res, errors);
  }

  next();
}

function validateMemberPayload(req, res, next) {
  const { name, fullName, email, role, status, phoneNumber, studentId, faculty, course, yearOfStudy, membershipType, profileImage, bio, skills, interests } = req.body;
  const errors = [];

  const displayName = name || fullName;
  if (!isNonEmptyString(displayName)) {
    errors.push({ field: "name", message: "Full name is required." });
  }
  if (!validateEmail(email)) {
    errors.push({ field: "email", message: "Email is required and must be valid." });
  }
  if (role !== undefined && role !== "" && typeof role !== "string") {
    errors.push({ field: "role", message: "Role must be a string." });
  }
  if (status !== undefined && status !== "" && typeof status !== "string") {
    errors.push({ field: "status", message: "Status must be a string." });
  }
  if (profileImage !== undefined && profileImage !== "" && !validateUrl(profileImage)) {
    errors.push({ field: "profileImage", message: "Profile image must be a valid URL." });
  }
  if (phoneNumber !== undefined && phoneNumber !== "" && typeof phoneNumber !== "string") {
    errors.push({ field: "phoneNumber", message: "Phone number must be a string." });
  }
  if (studentId !== undefined && studentId !== "" && typeof studentId !== "string") {
    errors.push({ field: "studentId", message: "Student ID must be a string." });
  }
  if (faculty !== undefined && faculty !== "" && typeof faculty !== "string") {
    errors.push({ field: "faculty", message: "Faculty must be a string." });
  }
  if (course !== undefined && course !== "" && typeof course !== "string") {
    errors.push({ field: "course", message: "Course must be a string." });
  }
  if (yearOfStudy !== undefined && yearOfStudy !== "" && typeof yearOfStudy !== "string") {
    errors.push({ field: "yearOfStudy", message: "Year of study must be a string." });
  }
  if (membershipType !== undefined && membershipType !== "" && typeof membershipType !== "string") {
    errors.push({ field: "membershipType", message: "Membership type must be a string." });
  }
  if (bio !== undefined && bio !== "" && typeof bio !== "string") {
    errors.push({ field: "bio", message: "Bio must be a string." });
  }
  if (skills !== undefined && !isStringOrArray(skills)) {
    errors.push({ field: "skills", message: "Skills must be a comma-separated string or string array." });
  }
  if (interests !== undefined && !isStringOrArray(interests)) {
    errors.push({ field: "interests", message: "Interests must be a comma-separated string or string array." });
  }

  if (errors.length) {
    return sendValidationError(res, errors);
  }

  // Normalize: if fullName was sent instead of name, map it
  if (!req.body.name && req.body.fullName) {
    req.body.name = req.body.fullName;
  }

  next();
}

function validateApplicationPayload(req, res, next) {
  const { name, email, program, reviewedBy, applicationType, status } = req.body;
  const errors = [];

  if (!isNonEmptyString(name)) {
    errors.push({ field: "name", message: "Name is required." });
  }
  if (!validateEmail(email)) {
    errors.push({ field: "email", message: "Email is required and must be valid." });
  }
  if (!isNonEmptyString(program)) {
    errors.push({ field: "program", message: "Program is required." });
  }
  if (reviewedBy !== undefined && typeof reviewedBy !== "string") {
    errors.push({ field: "reviewedBy", message: "Reviewed by must be a string." });
  }
  if (applicationType !== undefined && typeof applicationType !== "string") {
    errors.push({ field: "applicationType", message: "Application type must be a string." });
  }
  if (status !== undefined && typeof status !== "string") {
    errors.push({ field: "status", message: "Status must be a string." });
  }

  if (errors.length) {
    return sendValidationError(res, errors);
  }

  next();
}

function validateApplicationUpdate(req, res, next) {
  const { name, email, program, reviewedBy, applicationType, status } = req.body;
  const errors = [];

  if (name !== undefined && !isNonEmptyString(name)) {
    errors.push({ field: "name", message: "Name must be a non-empty string." });
  }
  if (email !== undefined && email !== "" && !validateEmail(email)) {
    errors.push({ field: "email", message: "Email must be valid." });
  }
  if (program !== undefined && !isNonEmptyString(program)) {
    errors.push({ field: "program", message: "Program must be a non-empty string." });
  }
  if (reviewedBy !== undefined && typeof reviewedBy !== "string") {
    errors.push({ field: "reviewedBy", message: "Reviewed by must be a string." });
  }
  if (applicationType !== undefined && typeof applicationType !== "string") {
    errors.push({ field: "applicationType", message: "Application type must be a string." });
  }
  if (status !== undefined && typeof status !== "string") {
    errors.push({ field: "status", message: "Status must be a string." });
  }

  if (errors.length) {
    return sendValidationError(res, errors);
  }

  next();
}

module.exports = {
  validateProjectPayload,
  validateProjectUpdate,
  validatePartnerPayload,
  validatePartnerUpdate,
  validateMemberPayload,
  validateEventPayload,
  validateApplicationPayload,
  validateApplicationUpdate,
};
