import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import { getTickets, reset } from "../features/tickets/ticketSlice";
const Tickets = () => {
  const { tickets, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTickets());
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => {
          return <TicketItem key={ticket._id} ticket={ticket} />;
        })}
      </div>
    </div>
  );
};

export default Tickets;
