import { Component} from 'react';

class NextRegister extends Component {
  render() {
    return (
        <div>
          <input type="tel" id="phone" name="phonenumber"></input>
          <select id="gender" name="gender">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
          </select>
          <select id="school" name="school">
              <option>School of Computer and Information Sciences</option>
          </select>
          <select id="department" name="department">
              <option>Computer Science</option>
          </select>
          <select id="semester" name="semester">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
          </select>
          <select id="yearofjoin" name="yearOfJoin">
              <option>2001</option>
              <option>2012</option>
              <option>2018</option>
          </select>
          <input type="date" id="dateOfBirth" name="dob"></input>
          
          <button type="submit">Submit</button>
        </div>
      );
  }
    
}

export default NextRegister;