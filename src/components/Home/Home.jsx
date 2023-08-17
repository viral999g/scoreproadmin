import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchBar from "material-ui-search-bar";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios("/api/admin/allusers", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(data);
        setUsers(data?.users);
        setFilteredUsers(data?.users);
      } catch (e) {
        navigate("/login");
      }
    };

    getUsers();
  }, [navigate]);

  const requestSearch = (searchedVal) => {
    const filteredRows = users.filter((row) => {
      return row.email.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setFilteredUsers(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div>
      <Navbar />
      <div className="px-5 mt-6">
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Serial no.</TableCell>
                <TableCell align="center">User email</TableCell>
                <TableCell align="center">Created at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.created_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
