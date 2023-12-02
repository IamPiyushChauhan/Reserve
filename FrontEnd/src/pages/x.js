import React, { useState } from 'react';

const MemberForm = () => {
  const initialMemberData = {
    name: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
  };

  const [passenger, setPassenger] = useState(Array.from({ length: 10 }, () => ({ ...initialMemberData })));
  const [errors, setErrors] = useState(Array.from({ length: 10 }, () => ({ ...initialMemberData })));

  const validateName = (name, index) => {
    if (!name.trim()) {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].name = 'Name is required';
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].name = '';
        return newErrors;
      });
    }
  };

  const validateGender = (gender, index) => {
    if (gender !== 'male' && gender !== 'female') {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].gender = 'Invalid gender';
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].gender = '';
        return newErrors;
      });
    }
  };

  const validateAge = (age, index) => {
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge >= 100) {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].age = 'Invalid age';
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].age = '';
        return newErrors;
      });
    }
  };

  const validateEmail = (email, index) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].email = 'Invalid email';
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].email = '';
        return newErrors;
      });
    }
  };

  const validatePhone = (phone, index) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].phone = 'Invalid phone number';
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].phone = '';
        return newErrors;
      });
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setPassenger((prevPassenger) => {
      const newMembers = [...prevPassenger];
      newMembers[index][name] = value;
      return newMembers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Additional validation or submission logic can be added here
    // For simplicity, let's just log the data for now
    console.log('Members data submitted:', passenger);
  };

  return (
    <form onSubmit={handleSubmit}>
      {passenger.map((member, index) => (
        <div key={index}>
          <h3>Member {index + 1}</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={member.name}
              onChange={(e) => handleChange(e, index)}
              onBlur={() => validateName(member.name, index)}
            />
            <span className="error">{errors[index].name}</span>
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={member.gender}
              onChange={(e) => handleChange(e, index)}
              onBlur={() => validateGender(member.gender, index)}
            />
            <span className="error">{errors[index].gender}</span>
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={member.age}
              onChange={(e) => handleChange(e, index)}
              onBlur={() => validateAge(member.age, index)}
            />
            <span className="error">{errors[index].age}</span>
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={member.email}
              onChange={(e) => handleChange(e, index)}
              onBlur={() => validateEmail(member.email, index)}
            />
            <span className="error">{errors[index].email}</span>
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={member.phone}
              onChange={(e) => handleChange(e, index)}
              onBlur={() => validatePhone(member.phone, index)}
            />
            <span className="error">{errors[index].phone}</span>
          </div>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MemberForm;
