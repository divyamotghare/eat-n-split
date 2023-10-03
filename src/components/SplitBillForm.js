import { useState } from "react";
import Button from "./Button";

export default function SplitBillForm({ selectedFriend, HandleSplitBill }) {
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
