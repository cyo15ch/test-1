class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [
        {
          benefit: 'Room and Board',
          actual: 20,
          company_a: 50,
          company_b: 130
        }, {
          benefit: 'Miscellaneous Charges',
          actual: 5,
          company_a: 200,
          company_b: 500
        }, {
          benefit: "Surgeon's Fee",
          actual: 100,
          company_a: 20,
          company_b: 3
        }, {
          benefit: "Anaesthetist's Fee",
          actual: 100,
          company_a: 20,
          company_b: 3
        }, {
          benefit: 'Operating Theatre Charges',
          actual: 100,
          company_a: 20,
          company_b: 3
        }
      ],
      form: {
        benefit: '',
        actual: 0,
        company_a: 0,
        company_b: 0
      }
    };

    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addStock = this.addStock.bind(this);
  }

  removeStock(index) {
    const portfolio = this.state.portfolio.slice(); // shallow copy
    portfolio.splice(index, 1); // remove value at index

    this.setState({ portfolio });
  }

  handleChange(event, index) {
    const portfolio = this.state.portfolio.slice(); // shallow copy
    const { name, value } = event.target;

    portfolio[index][name] = value;
    this.setState({ portfolio });
  }

  handleFormChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;

    form[name] = value;
    this.setState({ form });
  }

  addStock(event) {
    event.preventDefault();
    const portfolio = this.state.portfolio.slice();

    portfolio.push(this.state.form);
    this.setState({
      portfolio,
      form: {
        benefit: '',
        actual: 0,
        company_a: 0,
        company_b: 0
      }
    });
    // reset form to empty
  }

  render() {
    const {
      portfolio,
      form,
    } = this.state;


    const portfolio_market_value = portfolio.reduce((total, value) => total += value[portfolio_market_value], 0);
    const portfolio_cost = portfolio.reduce((total, value) => total += value[portfolio_market_value], 0);
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;
    return (
      <div className="container">
        <h1 className="text-center my-4">Medical Insurance</h1>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Benefit</th>
                  <th scope="col">Actual ($)</th>
                  <th scope="col">Company A ($)</th>
                  <th scope="col">Company B ($)</th>
                  <th scope="col">Shortfall Company A ($)</th>
                  <th scope="col">Shortfall Company B ($)</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock, index) => {
                  const {
                    benefit,
                    actual,
                    company_a,
                    company_b,
                  } = stock;

                  const market_value = company_a - actual;
                  const unrealized_gain_loss = company_b - actual;
                  // Adopting the underscore_style for consistency

                  return (
                    <tr key={index}>
                      <td>{benefit}</td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="actual" value={actual} /></td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="company_a" value={company_a} /></td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="company_b" value={company_b} /></td>
                      <td>{market_value}</td>
                      <td>{unrealized_gain_loss}</td>
                      <td><button className="btn btn-light btn-sm" onClick={() => this.removeStock(index)}>remove</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <form className="col-12 mt-2 mb-4" onSubmit={this.addStock}>
            <input
              className="mx-2"
              name="benefit"
              type="text"
              placeholder="Benefit"
              onChange={this.handleFormChange}
              value={form.name}
              required
            />
            <input
              className="mx-2"
              name="actual"
              type="number"
              placeholder="Actual"
              value={form.actual}
              onChange={this.handleFormChange}
            />
            <input
              className="mx-2"
              name="company_a"
              type="number"
              placeholder="Company_a"
              value={form.cost_per_share}
              onChange={this.handleFormChange}
            />
            <input
              className="mx-2"
              name="company_b"
              type="number"
              placeholder="Company_b"
              value={form.company_b}
              onChange={this.handleFormChange}
            />
            <button className="btn btn-primary btn-sm">add</button>
          </form>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio value: $ {portfolio_market_value}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio gain/loss: $ {portfolio_gain_loss}</h4>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Portfolio />,
  document.getElementById('root')
);
