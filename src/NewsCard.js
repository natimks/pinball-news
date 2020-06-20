import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '18em',
    height: '15em',
    margin: 5,
    borderColor: '#3f51b5',
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    color: '#001a1a',
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 10,
  },
});

const formatDate = (date) => {
  if (moment(date).isValid()) {
    return moment(date).format('DD/MM/yyyy');
  }
  return date;
};
export default function NewsCard({ title, url, createAt }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {title}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {formatDate(createAt)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={url} size='small'>
          Read more
        </Button>
      </CardActions>
    </Card>
  );
}
