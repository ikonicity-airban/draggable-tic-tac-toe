import { doc, Timestamp, updateDoc } from "firebase/firestore"
import { Player } from "../types"
import { updateProfile, User } from "firebase/auth";

import { faker } from '@faker-js/faker';
import { db } from "../firebase";
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';
// Kassandra.Haley@erich.biz

function createPlayerDto (user: Partial<User> ): Player {
  let displayName = user.displayName
  let photoURL = user.photoURL
  if (!user.displayName && user && !photoURL) {
    displayName = faker.person.fullName()
    photoURL = faker.image.avatar()
    updateProfile(user as User, {
      displayName,
      photoURL
    })
    updateDoc(doc(db, "players", `${user.uid}`), {
      displayName,
      photoURL
    })
  }
  return{
    createdAt: Timestamp.now(),
    id: user?.uid ?? "",
    isActive: true,
    displayName: user.displayName || faker.person.fullName(),
    score: 0,
  }
}

export default createPlayerDto