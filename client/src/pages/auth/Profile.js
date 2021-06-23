import React, {useState, useMemo, Fragment } from 'react';
import {toast} from 'react-toastify';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {gql} from 'apollo-boost'
import omitDeep from 'omit-deep';
import {PROFILE} from '../../graphql/queries'
import {USER_UPDATE} from '../../graphql/mutations';
import Resizer from "react-image-file-resizer";


const Profile = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    about: '',
    images: []
  })
  const [loading, setLoading] = useState(false)

  const {data} = useQuery(PROFILE)

  useMemo(() => {
    if(data) {
      console.log(data.profile)
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: omitDeep(data.profile.images, ["__typename"])
      })
    }
  }, [data])

  // mutation
  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      console.log('USER UPDATE MUTATION IN PROFILE', data);
      toast.success('Profile updated');
    }
  });

  //destructure
  const { username, name, email, about, images } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    // return;
    setLoading(true);
    userUpdate({ variables: {input: values}});
    setLoading(false);
  };

  const handleChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value })
  };

  const fileResizeAndUpload = (e) => {
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          console.log(uri);
          // this.setState({ newImage: uri });
        },
        "base64"
      );
    }
  };

  const profileUpdateForm = () => (
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
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={fileResizeAndUpload}
          className="form-control"
          placeholder="Image"
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

  return <div className="container p-5">{profileUpdateForm()}</div>;
};

export default Profile;
