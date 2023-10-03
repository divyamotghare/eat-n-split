import { useState } from "react";

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
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

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
function FriendsList({ friends, handleSelectedFriend, selectedFriend }) {
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

function Friend({ friend, handleSelectedFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => handleSelectedFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FriendAddForm({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmitAddFriend(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    handleAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmitAddFriend}>
      <label>👩🏼‍🤝‍👨🏼Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <label>🖼️Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function SplitBillForm({ selectedFriend, HandleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoPaid, setWhoPaid] = useState("user");

  const paidByFriend = bill ? bill - paidByUser : "";
  function handleSubmitBill(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    HandleSplitBill(whoPaid === "user" ? paidByFriend : -paidByFriend);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmitBill}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => {
          setBill(Number(e.target.value));
        }}
      />

      <label>🧍‍♂️Your expenses</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) => {
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          );
        }}
      />

      <label>👩🏼‍🤝‍👨🏼{selectedFriend.name}'s expense:</label>
      <input type="number" disabled value={paidByFriend} />

      <label>🤑Who is paying the bill? </label>
      <select
        value={whoPaid}
        onChange={(e) => {
          setWhoPaid(e.target.value);
        }}
      >
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
