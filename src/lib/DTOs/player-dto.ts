import { Timestamp } from "firebase/firestore"
import { Player } from "../types"
import { User } from "firebase/auth"

function createPlayerDto (user: User ):Player {
  return{
    createdAt: Timestamp.now(),
    id: user.uid,
    isActive: true,
    name: user.displayName ||"",
    score: 0,
  }
}

export default createPlayerDto