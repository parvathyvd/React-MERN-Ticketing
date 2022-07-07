import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, createNote, reset } from "../features/notes/noteSlice";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );
  const { notes, isLoading: notesIsLosing } = useSelector(
    (state) => state.notes
  );
  const params = useParams();
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, ticketId]);

  if (isLoading || notesIsLosing) {
    return <Spinner />;
  }
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };
  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <h2>
          Tciket ID : {ticket._id}
          <span className="{`status status-${ticket.status`}">
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submited: {new Date(ticket.createdAt).toLocaleString("en-Us")}
        </h3>
        <h3>Product : {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => {
        return <NoteItem note={note} key={note._id} />;
      })}
      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
