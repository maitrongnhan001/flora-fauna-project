import React from 'react'

import './Table.scss'

class Table extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
        }
    }

    getData() {
        return this.props.contracts.map((contract, idx) => {
            return (
                <tr className='data' key={idx}>
                    <td>
                        <p>{idx+1}</p>
                    </td>
                    <td>
                        <p>{contract.name}</p>
                    </td>
                    <td>
                        <p>{contract.email}</p>
                    </td>
                    <td >
                        <p>{contract.phone}</p>
                    </td>
                    <td>
                        <p>{contract.message}</p>
                    </td>
                </tr>
            )
        })
    }

    //Update offset add more data
    handleUpdatePosition = async (e)=>{
        e.target.innerHTML = 'Loading...'
        setTimeout(()=>{
            e.target.innerHTML = 'See more'
        }, 1000)
        await this.setState({offset: this.props.offset+11})
        this.props.onSetOffset(this.state.offset)
    }

    
    render() {
        return (
            <div className='table-contracts'>
                <p className='label-contract'>Contracts Management</p>
                <table>
                    <tbody>
                        <tr className='header'>
                            <th className='sn-th'>S.N.</th>
                            <th className='name-th'>Name</th>
                            <th className='email-th'>Email</th>
                            <th className='phone-th'>Phone</th>
                            <th className='message-th'>Message</th>
                        </tr>
                        {this.getData()}
                    </tbody>
                </table>
                {this.props.contracts.length === 0 && <p className='no-data'>{this.props.loading ? 'No data found!' : 'Loading..'}</p>}
                {this.props.contracts.length !== 0 && <button className='orders-see-more' onClick={this.handleUpdatePosition}>See more</button>}
            </div>
        )
    }
}

export default Table