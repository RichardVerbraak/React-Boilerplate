import React from 'react'
import { shallow } from 'enzyme'
import DashboardPage from '../../components/DashboardPage'

// Snapshot is not right (yet)
test('Should render dashboard page', () => {
    const wrapper = shallow(<DashboardPage/>)
    expect(wrapper).toMatchSnapshot()
})