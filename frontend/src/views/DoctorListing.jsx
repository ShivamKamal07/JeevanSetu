import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorListing() {
  const navigate = useNavigate();

  // ✅ Valid MongoDB ObjectIds
  const [doctors] = useState([
    {
      _id: "661f8c9e2a4f3b001234abcd",
      name: "Dr. Amit Sharma",
      specialization: "General Physician",
      experience: "8 Years Experience",
      location: "Lucknow",
      rating: "★★★★★",
      fees: "₹500",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      _id: "661f8c9e2a4f3b001234abce",
      name: "Dr. Mansi Bhaskar",
      specialization: "Internal Medicine",
      experience: "12 Years Experience",
      location: "Lucknow",
      rating: "★★★★☆",
      fees: "₹700",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      _id: "661f8c9e2a4f3b001234abcf",
      name: "Dr. Prachi Verma",
      specialization: "Pediatrician",
      experience: "6 Years Experience",
      location: "Lucknow",
      rating: "★★★★☆",
      fees: "₹600",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      _id: "661f8c9e2a4f3b001234abd0",
      name: "Dr. Shivam",
      specialization: "Cardiologist",
      experience: "10 Years Experience",
      location: "Lucknow",
      rating: "★★★★★",
      fees: "₹900",
      photo: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      _id: "661f8c9e2a4f3b001234abd1",
      name: "Dr. Rivesh",
      specialization: "Dermatologist",
      experience: "9 Years Experience",
      location: "Lucknow",
      rating: "★★★★☆",
      fees: "₹650",
      photo: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      _id: "661f8c9e2a4f3b001234abd2",
      name: "Dr. Ritu Saxena",
      specialization: "Gynecologist",
      experience: "14 Years Experience",
      location: "Lucknow",
      rating: "★★★★★",
      fees: "₹800",
      photo: "https://randomuser.me/api/portraits/women/55.jpg",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Filtering logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase());

    const matchesSpec = filter === "all" || doc.specialization === filter;

    return matchesSearch && matchesSpec;
  });

  // ✅ FIXED NAVIGATION
  const handleBooking = (doctorId) => {
    navigate(`/book?doctorId=${doctorId}`);
  };

  return (
    <div className="container">
      <style>
        {`
        .container {
          max-width: 1200px;
          margin: auto;
          padding: 30px 20px;
        }

        h1 {
          text-align: center;
          margin-bottom: 25px;
          color: black;
        }

        .filter-box {
          display: flex;
          gap: 12px;
          margin-bottom: 25px;
        }

        .filter-box input,
        .filter-box select {
          flex: 1;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
        }

        .doctor-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 22px;
        }

        .doctor-card {
          background: white;
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          transition: 0.3s;
        }

        .doctor-card:hover {
          transform: translateY(-6px);
        }

        .doctor-header {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }

        .doctor-photo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }

        .doctor-name {
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }

        .specialization {
          color: #66b2b2;
          font-weight: 500;
          margin: 4px 0;
        }

        .details {
          font-size: 14px;
          color: #555;
          margin-bottom: 10px;
          line-height: 1.5;
        }

        .fees {
          font-size: 15px;
          font-weight: bold;
          color: #2f6666;
        }

        .rating {
          color: #ffaa00;
          margin-bottom: 12px;
        }

        .book-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #66b2b2, #4d9999);
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .book-btn:hover {
          box-shadow: 0 5px 12px rgba(0,0,0,0.2);
          opacity: 0.9;
        }

        @media(max-width:768px){
          .filter-box {
            flex-direction: column;
          }
        }
        `}
      </style>

      <h1>Doctors Near You</h1>

      {/* Search + Filter */}
      <div className="filter-box">
        <input
          type="text"
          placeholder="Search doctor name or specialist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Specialists</option>
          <option value="General Physician">General Physician</option>
          <option value="Internal Medicine">Internal Medicine</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Dentist">Dentist</option>
        </select>
      </div>

      {/* Doctor List */}
      <div className="doctor-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div key={doc._id} className="doctor-card">
              <div className="doctor-header">
                <img src={doc.photo} alt={doc.name} className="doctor-photo" />
                <div>
                  <div className="doctor-name">{doc.name}</div>
                  <div className="specialization">{doc.specialization}</div>
                </div>
              </div>

              <div className="details">
                {doc.experience} <br />
                Location: {doc.location} <br />
                <span className="fees">
                  Consultation Fee: {doc.fees}
                </span>
              </div>

              <div className="rating">{doc.rating}</div>

              <button
                className="book-btn"
                onClick={() => handleBooking(doc._id)}
              >
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <p className="text-center w-100">
            No doctors found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default DoctorListing;