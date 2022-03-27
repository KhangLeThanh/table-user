import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";

export const TableUser = (props) => {
  const useStyles = makeStyles({
    errorMessage: {
      color: "red",
      marginBottom: "0.5rem",
    },
  });
  const classes = useStyles();

  return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Old Value</TableCell>
                <TableCell>New Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.orderBy(props.users, "timestamp", "desc").map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="td" scope="row">
                    {moment(user.timestamp).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.diff[0].oldValue}</TableCell>
                  <TableCell>{user.diff[0].newValue}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="center" scope="row" colSpan={4}>
                  {props.hasError ? (
                    props.loading ? (
                      <span data-testid="loading-icon">
                        <AutorenewIcon />
                      </span>
                    ) : (
                      <div>
                        <Typography
                          className={classes.errorMessage}
                          mt={2}
                          mb={2}
                          variant="body2"
                          component="p"
                        >
                          {props.errorMessage}
                        </Typography>

                        <Button variant="contained" color="primary">
                          Retry
                        </Button>
                      </div>
                    )
                  ) : (
                    <Button variant="contained" color="primary">
                      Load More
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
  );
};

export default TableUser;
