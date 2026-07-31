"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import { Member, createMember, getMembers } from "@/lib/api";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [status, setStatus] = useState("Pending");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentId, setStudentId] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMembers() {
      try {
        const response = await getMembers();
        setMembers(Array.isArray(response.data) ? response.data : []);
      } catch {
        setError("Unable to load members.");
      } finally {
        setLoading(false);
      }
    }

    loadMembers();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const skillsList = skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);
      const interestsList = interests
        .split(',')
        .map((interest) => interest.trim())
        .filter(Boolean);

      await createMember({
        name,
        email,
        role,
        status,
        phoneNumber,
        studentId,
        faculty,
        course,
        yearOfStudy,
        membershipType,
        profileImage,
        bio,
        skills: skillsList,
        interests: interestsList,
      });
      const response = await getMembers();
      setMembers(Array.isArray(response.data) ? response.data : []);
      setName("");
      setEmail("");
      setRole("Member");
      setStatus("Pending");
      setPhoneNumber("");
      setStudentId("");
      setFaculty("");
      setCourse("");
      setYearOfStudy("");
      setMembershipType("");
      setProfileImage("");
      setBio("");
      setSkills("");
      setInterests("");
    } catch {
      setError("Unable to create member.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminPageShell title="Members" description="Add and manage membership records saved in Appwrite.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Members</h2>
            <span className="text-xs text-gray-500">{members.length} total</span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading members…</p>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.$id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                    <span className="text-[11px] rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                      {member.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-gray-500">Role: {member.role}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Create Member</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-500">Name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="jane@example.com"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Role</label>
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                >
                  <option>Member</option>
                  <option>Leader</option>
                  <option>Mentor</option>
                  <option>Volunteer</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500">Status</label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                >
                  <option>Pending</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="grid gap-3">
              <div>
                <label className="text-xs text-gray-500">Phone number</label>
                <input
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  placeholder="+254 700 000 000"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Student ID</label>
                  <input
                    value={studentId}
                    onChange={(event) => setStudentId(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                    placeholder="S123456"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Membership type</label>
                  <input
                    value={membershipType}
                    onChange={(event) => setMembershipType(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                    placeholder="Student"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Faculty</label>
                  <input
                    value={faculty}
                    onChange={(event) => setFaculty(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                    placeholder="Engineering"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Course</label>
                  <input
                    value={course}
                    onChange={(event) => setCourse(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                    placeholder="Computer Science"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Year of study</label>
                  <input
                    value={yearOfStudy}
                    onChange={(event) => setYearOfStudy(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                    placeholder="Year 2"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Profile image URL</label>
                  <input
                    value={profileImage}
                    onChange={(event) => setProfileImage(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Bio</label>
                <textarea
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  rows={3}
                  placeholder="Add a short bio"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Skills</label>
                <input
                  value={skills}
                  onChange={(event) => setSkills(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  placeholder="e.g. Design, Marketing, Python"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Interests</label>
                <input
                  value={interests}
                  onChange={(event) => setInterests(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  placeholder="e.g. Entrepreneurship, AI"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-riara-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-riara-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Add Member"}
            </button>
          </form>
        </section>
      </div>
    </AdminPageShell>
  );
}