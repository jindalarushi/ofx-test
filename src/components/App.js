import React, { Component } from 'react';
import '../styles/index.css';
import { connect } from 'react-redux';
import {fetchCustomerDetails} from '../actions';
class App extends Component
{
    constructor()
    {
        super();
        this.state={
            fromCurrency: '',
            toCurrency: '',
            amount: '',
            fields: {},
           errors: {},
           formIsValid: '',
           showFirstPage: false
        }
    }
  

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //First Name
        if(!fields["firstName"]){
           formIsValid = false;
           errors["firstName"] = "First Name Cannot be empty";
        }

        if(typeof fields["firstName"] !== "undefined"){
           if(!fields["firstName"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["firstName"] = "Only letters are allowed in First Name";
           }        
        }

        //Last Name
        if(!fields["lastName"]){
            formIsValid = false;
            errors["lastName"] = "Last Name Cannot be empty";
         }

 
         if(typeof fields["lastName"] !== "undefined"){
            if(!fields["lastName"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["lastName"] = "Only letters are allowed in Last Name";
            }        
         }
         //From Currency
        if(!fields["fromCurrency"]){
            formIsValid = false;
            errors["fromCurrency"] = "Select From Currency";
         }

          //To Currency
        if(!fields["toCurrency"]){
            formIsValid = false;
            errors["toCurrency"] = "Select To Currency";
         }

          //To Currency
        if(!fields["amount"]){
            formIsValid = false;
            errors["amount"] = "Amount cannot be empty";
         }
 

       this.setState({errors: errors, formIsValid: formIsValid});
       return formIsValid;
   }

    onSubmit = e => {
             e.preventDefault();
        if(this.handleValidation()){
            //alert("Form submitted");
            this.props.fetchCustomerDetails(this.state.fromCurrency, this.state.toCurrency, this.state.amount);
            this.setState({showFirstPage:false});
         }else{
         //alert("Form has errors.")
         }
    }
    handleChange(field, e){  
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    handleFromCurrency = event =>
    {
        this.setState({fromCurrency:event.target.value});
        this.handleChange("fromCurrency", event);
    }
    handleToCurrency = event =>
    {
        this.setState({toCurrency:event.target.value});
        this.handleChange("toCurrency", event);
    }
    handleAmount = e =>
    {
        this.setState({amount:e.target.value});
        this.handleChange("amount",e);
    }
 

    render()
    {
        return(
            <div>
            
            <h2>Quick Quote</h2>
            
            {this.props.CustomerRate && !this.state.showFirstPage ? 
            (
                <div className='customerDetails'>
                    <p>OFX Customer Rate</p>
                    <h2 style ={{color:'green'}}>{this.props.CustomerRate}</h2>
                    <p>From</p>
                    <h3>{this.state.fromCurrency} <span style={{color:'blue'}}>  {this.state.amount}</span></h3>
                     <p>To</p>
                        <h3>{this.state.toCurrency} <span style={{color:'blue'}}>  {this.props.CustomerAmount}</span></h3>

                        <input type ="submit" value ="Start New Quote" onClick={() =>this.setState({showFirstPage : true, fromCurrency: '', toCurrency: '', amount: '', fields: {}, errors: {}, formIsValid: ''})}></input>

                   
                   
                </div>

            ) :
            (
                <div>
                    <form className='input-form' onSubmit={this.onSubmit}>
                        <table width='100%'>
                            <tr width='100%'>
                                 <td width ='50%'> 
                                    <label for="firstName">First Name <span style={{color:'red'}}>*</span></label>
                                    <input type="text" ref="firstName" placeholder="First Name" onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]}/>
                                    <span style={{color: "red"}}>{this.state.errors["firstName"]}</span>
                                 </td>
                                 <td width ='50%'>
                                     <label for="lastName">Last Name <span style={{color:'red'}}>*</span></label>
                                    <input type="text" ref="lastName" placeholder="Last Name" onChange={this.handleChange.bind(this, "lastName")} value={this.state.fields["lastName"]}/>
                                    <span style={{color: "red"}}>{this.state.errors["lastName"]}</span>
                                 </td>
                            </tr>
                        </table>
                        <table width='100%'>
                            <tr width='100%'>
                                <td width='100%'>
                                    <label for="email">Email</label>
                                    <input type="text" id="email" placeholder="Email"/>
                                </td>
                            </tr>
                        </table>
                        <table width='100%'>
                            <tr width='100%'>
                                <td width ='15%'>
                                    <label for="mobile">Telephone/ Mobile</label>
                                    <select id ="countryCode">
                                        <option value="+61">+61</option>
                                        <option value="+91">+91</option>
                                     </select>
                                </td>
                                <td width='85%'>
                                    <input type="text" id="mobile" placeholder=""/>
                                </td>
                             </tr>
                        </table>
                        <table width='100%'>
                            <tr width='100%'>
                                <td width ='50%'>
                                    <label for="fromCurrency">From Currency <span style={{color:'red'}}>*</span></label>
                                    <select id ="fromCurrency" ref="fromCurrency" onChange={event => this.handleFromCurrency(event)}  value={this.state.fields["fromCurrency"]}>
                                         <option value="">--Select From Currency--</option>
                                         <option value="AUD">Australian Dollar(AUD)</option>
                                         <option value="CAD">Canadian Dollar (CAD)</option>
                                         <option value="DKK">Danish Krone(DKK)</option>
                                         <option value="EUR">Euro(EUR)</option>
                                         <option value="GBP">Pound(GBP)</option>
                                         <option value="JPY">Japanese Yen(JPY)</option>
                                         <option value="NOK">Norwegian Krone(NOK)</option>
                                         <option value="NZD">New Zealand Dollar(NZD)</option>
                                         <option value="USD">United States Dollar(USD)</option>
                                    </select>
                                    <span style={{color: "red"}}>{this.state.errors["fromCurrency"]}</span>

                                </td>
                                <td width='50%'>
                                    <label for="toCurrency">To Currency <span style={{color:'red'}}>*</span></label>
                                    <select id ="toCurrency" ref="toCurrency" onChange={event => this.handleToCurrency(event)} value={this.state.fields["toCurrency"]}>
                                        <option value="">--Select To Currency--</option>
                                        <option value="AUD">Australian Dollar(AUD)</option>
                                        <option value="CAD">Canadian Dollar(CAD)</option>
                                        <option value="DKK">Danish Krone(DKK)</option>
                                        <option value="EUR">Euro(EUR)</option>
                                        <option value="GBP">Pound(GBP)</option>
                                        <option value="JPY">Japanese Yen(JPY)</option>
                                        <option value="NOK">Norwegian Krone(NOK)</option>
                                        <option value="NZD">New Zealand Dollar(NZD)</option>
                                        <option value="USD">United States Dollar(USD)</option>
                                    </select>
                                    <span style={{color: "red"}}>{this.state.errors["toCurrency"]}</span>
                                </td>
                            </tr>
                         </table>
                         <table width='50%'>
                            <tr>
                                <td>
                                    <label for="amount">Amount <span style={{color:'red'}}>*</span></label>
                                    <input type="text" id="amount" ref="amount" placeholder="Amount" onChange={event => this.handleAmount(event)} value={this.state.fields["amount"]}/>
                                    <span style={{color: "red"}}>{this.state.errors["amount"]}</span>
                                </td>                           
                            </tr>
                        </table>
                        <table width='100%'>
                            <tr>
                              
                                <td>
                                    <input type ="submit" value ="Get Quote"></input>
                                </td>
                            </tr>
                        </table>
            </form>
                </div>
            )}
            
            
            </div>
        )
    }
}

function mapStateToProps(state)
{
    console.log('state',state);
    return state;
}

export default connect(mapStateToProps, {fetchCustomerDetails})(App);