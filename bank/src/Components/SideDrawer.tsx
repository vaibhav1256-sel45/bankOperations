import React, { useState } from "react";
import styles from "./SideDrawer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../features/store";
import { fetchUsers } from "../features/Api/UsersApi";
import type { userData } from "../interfaces/userInterfaces";

const SidebarDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const result = useSelector((state: RootState) => state.user);

  const handleClick = () => {
    setOpen(true);
      dispatch(fetchUsers());
  };

  return (
    <div className={styles.drawerRoot}>
      <button
        className={styles.menuBtn}
        aria-label="Open sidebar"
        onClick={handleClick}
      >
        Click to know our customers
      </button>

      <div
        className={`${styles.overlay} ${!open ? styles.overlayHidden : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

<aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
  <button className={styles.closeBtn} aria-label="Close sidebar" onClick={() => setOpen(false)}>
    &times;
  </button>
  <div className={styles.sidebarContent}>
    {/* All your scrollable content goes here */}
    {result.status === "loading" && (
      <div className={styles.statusMessage}>Loading customers...</div>
    )}
    {result.status === "failed" && (
      <div className={styles.errorMessage}>{result.error || "Failed to load users."}</div>
    )}
    {result.status === "succeeded" && (
      <div className={styles.userList}>
        {result.data.map((val: userData) => (
          <div className={styles.userItem} key={val.id}>
            <span className={styles.userId}>ID: {val.id}</span>
            <span>{val.name}</span>
          </div>
        ))}
        {result.data.length === 0 && (
          <div className={styles.statusMessage}>No users found.</div>
        )}
      </div>
    )}
  </div>
</aside>

    </div>
  );
};

export default SidebarDrawer;
