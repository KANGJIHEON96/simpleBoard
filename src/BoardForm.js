import React, { Component } from "react";
import { Table } from "react-bootstrap";
import {NavLink} from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

class BoardRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <NavLink to={{pathname:"/board/detail", query: { _id: this.props._id } }}
          >
            {this.props.createdAt.substring(0, 10)}
            </NavLink>
                </td>
                <td>
                    <NavLink t0={{pathname:"/board/detail", query: {_id:this.props._id}}}>
                        {this.props.title}
                    </NavLink>
                </td>
            </tr>
        );
    }
}

class BoardForm extends Component {
    state = {
        boardList: []
    };

    componentDidMount() {
        this.getBoardList();
    }

    getBoardList = () => {
        const send_param = {
            headers,
            _id: $.cookie("login_id")
        }
 
        axios
        .post("http://localhost:8080/board/getBoardList", send_param)
        .then(returnData => {
          let boardList;
          if (returnData.data.list.length > 0) {
  
            const boards = returnData.data.list;
            boardList = boards.map(item => (
              <BoardRow _id={item._id} createdAt={item.createdAt} title={item.title}></BoardRow>
            ));
            this.setState({ boardList: boardList });
          } 
           else {
            boardList = (
              <tr>
                <td colSpan="2">작성한 게시글 없음.</td>
              </tr>
            );
            this.setState({
              boardList: boardList
            });
            window.location.reload();
          }
        })

        .catch(err => {
          console.log(err);
        });
    };


    render() {
        const divStyle = {
          margin: 50
        };
    
        return (
          <div>
            <div style={divStyle}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>글 제목</th>
                  </tr>
                </thead>
                <tbody>{this.state.boardList}</tbody>
              </Table>
            </div>
          </div>
        );
    }
}    

export default BoardForm;