import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: []
  };

  // call function
  componentDidMount = () => {
    this.getBlogPost();
  }

  getBlogPost = () => {
    axios.get('/api')
    .then((response)=>{
      const data = response.data;
      this.setState({ posts : data})
      console.log('data has been received')
    })
    .catch(()=>{
      alert("error receiving data")
    })
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  submit = (e) => {
    e.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.boy,
    };

    // making http call
    axios({
      url: "/api/save",
      method: "POST",
      data: payload
    })
      .then(() => {
        console.log("data has been sent to server ");
        this.resetUserInput();
        this.getBlogPost();
      })
      .catch(() => {
        console.log("oops some error occured");
      });
  };
  // agar abhi hum run kare to error aayega kyunki react by default 3000 par run karta hai and humne 8080 par apna node chalaya hai..
  // so isk hatane ke liye, react ke packet .json par jaao and end mein proxy mein apna server daaldo

  resetUserInput = () => {
    this.setState({
      title: "",
      body: "",
    });
  };

  // display karne ke liye
  displayBlogPost = (posts) => {

    if(!posts.length) return null;

    return posts.map((post, index) => (
      <div key= {index} className="blog-post_display" >
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

  };

  render() {
    console.log("State: ", this.state);
    return (
      <div className= "app">
        <h2>Welcome to my page</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              autoComplete="off"
              placeholder="enter title"
            />
          </div>
          <div className="form-input">
            <textarea
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
              autoComplete="off"
              placeholder="enter body"
            />
          </div>

          <button>Submit</button>
        </form>
        <div className="blog-">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;
