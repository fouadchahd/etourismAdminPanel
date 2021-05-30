import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./components.styles/userTable.css";

import { Avatar, Badge } from "@material-ui/core";
const dataTable = ({ data }) => {
  const formatStingDate = (date) => {
    var vdate = date.slice(0, 10);
    return vdate;
  };
  return (
    <TableContainer component={Paper}>
      <Table className={"table"} style={{ textAlign: "center" }}>
        <TableHead className={"TableHead"}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Nom Complet</TableCell>
            <TableCell align="right">Adresse e-mail</TableCell>
            <TableCell align="right">inscrit le </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Badge overlap="circle">
                    <Avatar
                      alt={row.profilePicture?.alt}
                      src={row.profilePicture?.url}
                    >
                      {row.pseudo.slice(0, 1)}
                    </Avatar>
                  </Badge>
                  <span style={{ marginLeft: "15px" }}>{row.pseudo}</span>
                </TableCell>
                <TableCell align="right">
                  {row.firstName}&nbsp;&nbsp;
                  {row.lastName}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  {formatStingDate(row.registeredAt)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default dataTable;
