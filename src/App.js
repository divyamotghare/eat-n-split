import { useState } from "react";
import Button from "./components/Button";
import FriendsList from "./components/FriendsList";
import FriendAddForm from "./components/FriendAddForm";
import SplitBillForm from "./components/SplitBillForm";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [displayAddFriend, setDisplayAddFriend] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelectedFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setDisplayAddFriend(false);
  }

  function HandleClickAddFriend() {
    setDisplayAddFriend((display) => !display);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setDisplayAddFriend(false);
  }
  function HandleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {displayAddFriend && (
          <FriendAddForm handleAddFriend={handleAddFriend} />
        )}

        <Button onClick={HandleClickAddFriend}>
          {displayAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          HandleSplitBill={HandleSplitBill}
        />
      )}
    </div>
  );
}
