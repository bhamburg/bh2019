import React, { Component } from "react"
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from "axios"
import convert from "xml-js"

const PROXY = "https://cors-anywhere.herokuapp.com/"
const APIKEY = "WtRxj0qGSLZH6RXaR3BRg"

class ReadingList extends Component {
  state = {
    currentlyReadingLoading: false,
    readLoading: false,
    error: false,
    currentlyReading: [],
    read: [],
  }

  componentDidMount() {
    this.fetchCurrentlyReadingList()
    this.fetchReadList()
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography gutterBottom variant="h3" component="h2">Reading List</Typography>
          {!this.state.error ? <>
          <Typography gutterBottom variant="h4" component="h3">Currently Reading</Typography>
          {this.state.currentlyReadingLoading && 
            <CircularProgress />
          }
          {!this.state.currentlyReadingLoading && (
          <div>
            {this.state.currentlyReading.map((book, i) => {
              let title = book.elements[1].elements[5].elements[0]['text']
              let url = book.elements[1].elements[10].elements[0]['text']
              let imageUrl = book.elements[1].elements[7].elements[0]['text']
              let desc = book.elements[1].elements[20].elements ? book.elements[1].elements[20].elements[0]['text'] : "(no description)"
              return (
                <Card key={i}>
                  <CardActionArea>
                    <CardMedia 
                      component="img"
                      alt={title}
                      image={imageUrl}
                      title={title} 
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h4">
                        {title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => window.open(url)}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              )
            })}
          </div>)}
          <Typography gutterBottom variant="h4" component="h3">Recently Read</Typography>
          {this.state.readLoading && 
            <CircularProgress />
          }
          {!this.state.readLoading && (
          <div>
            {this.state.read.map((book, i) => {
              let title = book.elements[1].elements[5].elements[0]['text']
              let url = book.elements[1].elements[10].elements[0]['text']
              let imageUrl = book.elements[1].elements[7].elements[0]['text']
              let desc = book.elements[1].elements[20].elements ? book.elements[1].elements[20].elements[0]['text'] : "(no description)"
              return (
                <Card key={i}>
                  <CardActionArea>
                    <CardMedia 
                      component="img"
                      alt={title}
                      image={imageUrl}
                      title={title} 
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h4">
                        {title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => window.open(url)}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              )
            })}
          </div>)}
          <br /><a href="https://www.goodreads.com/review/list/4284038-brian-hamburg">View All Books</a>
          </>
          : <div>Error loading lists!</div>
          }
        </Box>
      </Container>
    )
  }

  fetchCurrentlyReadingList = () => {
    this.setState({ currentlyReadingLoading: true })
    axios
      .get(`${PROXY}https://www.goodreads.com/review/list/4284038.xml?key=${APIKEY}&v=2&shelf=currently-reading`)
      .then((res) => {
        let xml = res.data
        let parsedJSON = JSON.parse(convert.xml2json(xml))
        let books = parsedJSON.elements[0].elements[2].elements
        console.dir(books)
        this.setState({ currentlyReadingLoading: false, currentlyReading: books },
          ()=>console.dir(this.state)
        )
      })
      .catch(error => {
        this.setState({ currentlyReadingLoading: false, error })
      })
  }

  fetchReadList = () => {
    this.setState({ readLoading: true })
    axios
      .get(`${PROXY}https://www.goodreads.com/review/list/4284038.xml?key=${APIKEY}&v=2&shelf=read`)
      .then((res) => {
        let xml = res.data
        let parsedJSON = JSON.parse(convert.xml2json(xml))
        let books = parsedJSON.elements[0].elements[2].elements
        console.dir(books)
        this.setState({ readLoading: false, read: books },
          ()=>console.dir(this.state)
        )
      })
      .catch(error => { 
        this.setState({ readLoading: false, error })
      })
  }

}

export default ReadingList