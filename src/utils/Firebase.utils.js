import {storage } from '../Firebase'
export const DeleteFirebaseImage = (firebaseRef) => {
  // Create a reference to the file to delete
  var desertRef = storage.child(firebaseRef);

  // Delete the file
  desertRef
    .delete()
    .then(() => {
      // File deleted successfully
      console.log("IMAGE DELETED");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log("IMAGE DELETED ERROR");
    });
};
