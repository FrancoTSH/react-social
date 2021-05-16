import { db, FieldValue, storage } from 'firebase/config';

export async function createPost(caption, image, username, userPhoto) {
  const storageRef = storage.ref(`photos/${image.name}`)
  const snapshot = await storageRef.put(image);
  const imageURL = await snapshot.ref.getDownloadURL();
  const postedAt = FieldValue.serverTimestamp();

  return db.collection('posts').add({
    caption,
    imageURL,
    userData: {
      username,
      userPhoto
    },
    likes: [],
    postedAt
  })
};

export function getPosts(callback) {
  return db
    .collection('posts')
    .orderBy('postedAt', 'desc')
    .limit(10)
    .onSnapshot(callback);
}

export async function likePost(id, userId) {
  return db
    .collection('posts')
    .doc(id)
    .update({
      likes: FieldValue.arrayUnion(userId)
    })
}

export async function unlikePost(id, userId) {
  return db
    .collection('posts')
    .doc(id)
    .update({
      likes: FieldValue.arrayRemove(userId)
    })
}

export async function deletePost(id, url) {
  let imageRef = storage.refFromURL(url);
  await imageRef.delete();
  return db.collection('posts')
    .doc(id)
    .delete();
}

export async function getComments(id) {
  const result = await db
    .collection('posts')
    .doc(id)
    .collection('comments')
    .orderBy('publishedAt', 'desc')
    .limit(3)
    .get();

  const lastDoc = !result.empty ? result.docs[result.docs.length - 1] : null;

  const nextEmpty = await db
    .collection('posts')
    .doc(id)
    .collection('comments')
    .orderBy('publishedAt', 'desc')
    .startAfter(lastDoc)
    .limit(3)
    .get();

  const docs = result.docs.map(doc => ({
    ...doc.data(),
    commentId: doc.id
  }))

  return { docs, lastDoc, nextEmpty: nextEmpty.empty }
}

export async function getMoreComments(id, last) {
  const result = await db
    .collection('posts')
    .doc(id)
    .collection('comments')
    .orderBy('publishedAt', 'desc')
    .startAfter(last)
    .limit(3)
    .get();

  const lastDoc = !result.empty ? result.docs[result.docs.length - 1] : null;

  const nextEmpty = await db
    .collection('posts')
    .doc(id)
    .collection('comments')
    .orderBy('publishedAt', 'desc')
    .startAfter(lastDoc)
    .limit(3)
    .get();

  const docs = result.docs.map(doc => ({
    ...doc.data(),
    commentId: doc.id
  }))

  return { docs, lastDoc, nextEmpty: nextEmpty.empty }
}

export async function addComment(postId, text, username) {
  const publishedAt = FieldValue.serverTimestamp();

  return db.collection('posts').doc(postId).collection('comments').add({
    text,
    username,
    publishedAt
  })
}