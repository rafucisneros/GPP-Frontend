import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ExamCard } from '../exam_card/ExamCard.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export const Carousel = ({ items, type="Professor" }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5}>
        {items.map( (item, index) => (
          <GridListTile key={index} style={{height: "auto"}}>
             <ExamCard 
              key={index} 
              title={item.name}
              id={item.id}
              type={type}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

// const Carousel = ({items, title, Component}) => (
//   <div className="carousel-container">
//     <div className="title">
//       <h2>{title}</h2>
//       <Link to={title} className="carousel-title-more">ver mas</Link>
//     </div>
//     <div className="carousel">
//       {items.map(producto => (
//         <Component key={producto.id} item={producto}/>
//       ))}
//     </div>
//   </div>
// )

// export default Carousel