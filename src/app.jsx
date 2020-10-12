import React, { Fragment } from 'react'
import { MTRow, MTColumn } from 'mt-ui'
import ExcelDropzone from './excel-dropzone.jsx'
import Users from './users'
import Scores from './scores'

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usersHighestScore: [],
      dataSortedByScore: [],
      currentUserScore: [],
      name: '',
      score: ''
    };
    this.handleSheetData = this.handleSheetData.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.compareScores = this.compareScores.bind(this);
    this.sortAndFilterData = this.sortAndFilterData.bind(this);

    // combine username and score read in from files
    let scoreFromFile = [];
    for (let i = 0; i < Scores.length; i++) {
      for (let j = 0; j < Users.length; j++) {
        if (Scores[i].userId === Users[j]._id) {
          scoreFromFile.push({ name: Users[j].name, score: Scores[i].score });
        }
      }
    }
    scoreFromFile.sort(this.compareScores);
    let tempdataFilteredByUsers = scoreFromFile.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);

    this.state.dataSortedByScore = scoreFromFile;
    this.state.usersHighestScore = tempdataFilteredByUsers;
  };

  handleSheetData(data) {
    // replace this log with actual handling of the data
    // console.log(data)

    // add users read in from file with users from excel, sort all and filter all
    let allUsers = this.state.dataSortedByScore.concat(data);
    this.sortAndFilterData(allUsers);
  };

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  };

  handleScoreChange(event) {
    if (isNaN(event.target.value)) return;
    this.setState({
      score: event.target.value
    });
  };

  handleSubmit(event) {
    // extremely basic form validation
    if (!this.state.name || !this.state.score) {
      event.preventDefault();
    } else {

      let userObj = {
        name: this.state.name,
        score: this.state.score
      }
      // add user from input to rest of users, then sort/filter all
      let tempData = this.state.dataSortedByScore;
      tempData.push(userObj);
      this.sortAndFilterData(tempData);

      this.setState({
        name: "",
        score: ""
      })
      event.preventDefault();
    }
  }

  handleNameClick(user) {
    // get all scores by clicked user and push to array
    let tempScoreArr = [];
    for (let i = 0; i < this.state.dataSortedByScore.length; i++) {
      if (this.state.dataSortedByScore[i].name === user) {
        tempScoreArr.push(this.state.dataSortedByScore[i]);
      }
    };
    // set to array used to display scores
    this.setState({
      currentUserScore: tempScoreArr
    })
  }

  sortAndFilterData(data) {

    let tempdataSortedByScore = data.sort(this.compareScores);
    let tempdataFilteredByUsers = tempdataSortedByScore.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);
    this.setState({
      dataSortedByScore: tempdataSortedByScore,
      usersHighestScore: tempdataFilteredByUsers
    })
  }

  compareScores(a, b) {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  }


  render() {
    return (
      <div className="container container--centered">
        <Fragment>
          <h1 className="m-t">Mediatool exercise</h1>
          <MTRow>
            <MTColumn width={20}>
              <ExcelDropzone
                onSheetDrop={this.handleSheetData}
                label="Drop your file here"
              />
            </MTColumn>
            <MTColumn width={75} offset={5}>
              <div>
                <h2>Initial site</h2>
                <p>
                  Drop the excel file scores.xlsx that you will find
                  in this repo in the area to the left and watch the log output in the console.
                  We hope this is enough to get you started with the import.
              </p>
              </div>
              <div>
                <h2>Explaining the grid</h2>
                <p>
                  In the Mediatool grid you can use MTRow and MTColumn
                  to structure your graphical components.
                  This is basically what you need to know:
              </p>
                <ul>
                  <li>
                    The index.jsx file uses these components so you
                    can see an example of how they work
                </li>
                  <li>MTRow will always create a line break</li>
                  <li>
                    MTColumns will stretch to the width of the entire row,
                    unless you use the properties width and offset
                </li>
                  <li>Width and offset is set in percent</li>
                </ul>
              </div>
            </MTColumn>
          </MTRow>
          <MTRow>
            <MTColumn className="form-column" width={60} offset={20}>
              <h2 className="score-heading">Enter a new score</h2>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name:
              <input className="form-input" type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                  Points:
              <input className="form-input" type="text" value={this.state.score} onChange={this.handleScoreChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </MTColumn>
          </MTRow>
          <MTRow>
            <MTColumn width={40}>
              <h3 className="list-heading">Highscore</h3>
              <ul className="score-ul" >
                {this.state.usersHighestScore.map((user, index) => (
                  <li onClick={() => { this.handleNameClick(user.name) }} key={index}>{index + 1}. {user.name} <span className="pull-right">{user.score} p</span></li>
                ))}
              </ul>
            </MTColumn>
            <MTColumn width={40} offset={20}>
              {this.state.currentUserScore.length > 0 &&
                <Fragment>
                  <h3 className="list-heading">{this.state.currentUserScore[0].name}s points</h3>
                  <ul className="score-ul">
                    {this.state.currentUserScore.map((user, index) => (
                      <li key={index}>{user.name} <span className="pull-right">{user.score}</span></li>
                    ))}
                  </ul>
                </Fragment>
              }
            </MTColumn>
          </MTRow>
        </Fragment>
      </div>

    )
  }
}
