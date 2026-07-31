const { createEmailSession, getAccount, logout, registerAccount } = require('../lib/appwrite/auth');
const { createMember } = require('../services/memberService');

async function registerHandler(req, res) {
  try {
    const { fullName, email, password, phoneNumber, studentId, faculty, course, yearOfStudy, skills, interests, membershipType } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Full name, email, and password are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }

    // Create Appwrite account
    const account = await registerAccount({
      email,
      password,
      name: fullName,
    });

    // Create member record in database
    const member = await createMember({
      fullName,
      email,
      phoneNumber: phoneNumber || '',
      studentId: studentId || '',
      faculty: faculty || '',
      course: course || '',
      yearOfStudy: yearOfStudy || '',
      skills: Array.isArray(skills) ? skills : typeof skills === 'string' ? skills.split(',').map((s) => s.trim()).filter(Boolean) : [],
      interests: Array.isArray(interests) ? interests : typeof interests === 'string' ? interests.split(',').map((s) => s.trim()).filter(Boolean) : [],
      membershipType: membershipType || 'Student',
      role: 'Member',
      status: 'Pending',
    });

    // Auto-login after registration
    const session = await createEmailSession(email, password);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: {
        session: session.secret || session.$id || session,
        userId: session.userId || session.$userId || null,
        member,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed.',
    });
  }
}

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }
    const session = await createEmailSession(email, password);
    res.json({
      success: true,
      data: {
        session: session.secret || session.$id || session,
        userId: session.userId || session.$userId || null,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || 'Invalid email or password.',
    });
  }
}

async function sessionHandler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No session token provided.' });
    }
    const sessionToken = authHeader.replace('Bearer ', '');
    const account = await getAccount(sessionToken);
    res.json({ success: true, data: account });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Session expired or invalid.' });
  }
}

async function logoutHandler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No session token provided.' });
    }
    const sessionToken = authHeader.replace('Bearer ', '');
    await logout(sessionToken);
    res.json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Logout failed.' });
  }
}

module.exports = {
  registerHandler,
  loginHandler,
  sessionHandler,
  logoutHandler,
};
