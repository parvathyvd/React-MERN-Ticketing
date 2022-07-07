import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
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
  }, [isError, message, ticketId]);
  if (isLoading) {
    return <Spinner />;
  }
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
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
      </header>
      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
