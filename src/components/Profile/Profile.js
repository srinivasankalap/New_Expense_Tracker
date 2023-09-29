import './Profile.css';
import { useEffect, useRef, useState } from 'react';
const Profile=()=>{
    const nameinputRef=useRef();
    const urlInputRef=useRef();
    const [initialData, setInitialData] = useState({ name: '', profilePhotoUrl: '' });

    useEffect(() => {
        const id = localStorage.getItem('token');
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBycSmTAkk_MbjTNxVPNXryNlABlqht8Co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idToken: id,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch data from the server.');
            }
          })
          .then((data) => {
            console.log(data.users[0].displayName);
            setInitialData({ name: data.users[0].displayName, profilePhotoUrl: data.users[0].photoUrl });
          })
          .catch((error) => {
            alert(error);
          });
      }, []);

    const submitHandler=async(e)=>{
        e.preventDefault();
        const id=localStorage.getItem('token')
        console.log(id)
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBycSmTAkk_MbjTNxVPNXryNlABlqht8Co', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                idToken: id,
                displayName: nameinputRef.current.value,
                photoUrl: urlInputRef.current.value,
                returnSecureToken: true
              }),
            });
      
            if (response.ok) {
              alert('Data sent successfully!');
            } else {
              alert('Failed to send data to the server.');
            }
          } catch (error) {
            alert('An error occurred while sending data.');
          }
    }
    return(<>
        <h3>Winners never quit, Quitter never win...</h3>
        <form onSubmit={submitHandler}>
            <h1>Contact Details</h1>
            <label htmlFor="name">Name</label>
            <input id="name" type="name" ref={nameinputRef} defaultValue={initialData.name}/>
            <label htmlFor="url">Profile Photo URL</label>
            <input id="url" type="url" ref={urlInputRef} defaultValue={initialData.profilePhotoUrl}/>
            <button>Update</button>
        </form>
        </>
    )
}

export default Profile;