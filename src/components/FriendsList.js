import Friend from "./Friend";
export default function FriendsList({
  friends,
  handleSelectedFriend,
  selectedFriend,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          handleSelectedFriend={handleSelectedFriend}
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
