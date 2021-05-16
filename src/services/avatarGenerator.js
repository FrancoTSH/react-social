import { storage } from 'firebase/config';

const URL = "https://ui-avatars.com/api";

export function getAvatarURL(username, picture) {
  return fetch(`${URL}/?name=${username}&background=random&bold=true&length=1`)
    .then(res => {
      if (!res.ok) throw new Error('Ocurrio un error')
      return res.blob()
    }).then(res => {
      const uploadTask = storage.ref(`profilePictures/${picture}.png`);
      return uploadTask.put(res);
    }).then(snapshot => snapshot.ref.getDownloadURL())
}