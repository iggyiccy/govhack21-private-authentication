import React from "react";
import { Redirect } from "react-router-dom";
import QrReader from "react-qr-reader";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaWdneWljY3kiLCJhIjoiY2tzbXFuMDJpMWg5cjJwb3hoamQzOHNzZCJ9.qM8kIpaIzNyEPKZl23pK3w",
});

const styled = withStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    margin: theme.spacing(4),
    padding: theme.spacing(2),
    width: "100%",
  },
  nuid: {
    overflowWrap: "anywhere",
  },
}));

function createData(location, arrivaltime, leavetime) {
  return { location, arrivaltime, leavetime };
}

const rows = [
  createData("Collin Street", "20-08-2021 10:30:00", "20-08-2021 16:30:00"),
  createData("Glenferrie Road", "21-08-2021 12:30:00", "21-08-2021 14:15:00"),
  createData("South Melbourne Market", "22-08-2021 12:00:00", "-"),
];

const DashboardPage = (props) => {
  if (!props.currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={props.classes.root}>
      <Paper className={props.classes.paper}>
        <Typography variant="h3">Account</Typography>
        <p>
          <strong>Name:</strong> {props.currentUser.firstName}{" "}
          {props.currentUser.lastName}
        </p>
        <p>
          <strong>Email:</strong> {props.currentUser.email}
        </p>
        <p>
          <strong>
            <a
              target="_blank"
              href="https://nuid.io/index.html"
              rel="external noopener noreferrer"
            >
              NuID
            </a>
            :
          </strong>{" "}
          <code className={props.classes.nuid}>{props.currentUser.nuid}</code>
        </p>
        <p>
          <strong>Account Created:</strong> {props.currentUser.createdAt}
        </p>
      </Paper>
      <Paper className={props.classes.paper}>
        <Typography variant="h5">Scan QR Code</Typography>
        <p>
          <QrReader />
        </p>
        <Button variant="outlined" color="primary">
          Check-In
        </Button>
      </Paper>
      <Paper className={props.classes.paper}>
        <Typography variant="h5">Check-In History</Typography>
        <Table className={props.classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell align="right">Arrival</TableCell>
              <TableCell align="right">Leave</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.location}>
                <TableCell component="th" scope="row">
                  {row.location}
                </TableCell>
                <TableCell align="right">{row.arrivaltime}</TableCell>
                <TableCell align="right">{row.leavetime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Paper className={props.classes.paper}>
        <Typography variant="h5">Current COVID Cases</Typography>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            console.info("Redirect to Data.vic dataset");
          }}
        >
          https://discover.data.vic.gov.au/dataset/all-victorian-sars-cov-2-covid-19-current-exposure-sites
        </Link>
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "50vh",
            width: "100%",
          }}
        >
          <Layer type="symbol">
            <Feature coordinates={[144.9651149072606, -37.81593406906988]} />
          </Layer>
          <Marker
            coordinates={[144.9651149072606, -37.81593406906988]}
            anchor="bottom"
          ></Marker>
        </Map>
      </Paper>
    </div>
  );
};

export default styled(DashboardPage);
