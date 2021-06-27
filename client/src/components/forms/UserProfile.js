import React from 'react'

const UserProfile = ({handleSubmit, handleChange, username, name, email, about, loading  }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        className="form-control"
        placeholder="Username"
        disabled={loading}
      />
    </div>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        className="form-control"
        placeholder="Name"
        disabled={loading}
      />
    </div>
    <div className="form-group">
      <label>Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
        className="form-control"
        placeholder="Email"
        disabled
      />
    </div>

    <div className="form-group">
      <label>About</label>
      <textarea
        name="about"
        value={about}
        onChange={handleChange}
        className="form-control"
        placeholder="about"
        disabled={loading}
      />
    </div>
    <button className="btn btn-primary" type="submit" disabled={!email || loading}>
      Submit
    </button>
  </form>
)

export default UserProfile
