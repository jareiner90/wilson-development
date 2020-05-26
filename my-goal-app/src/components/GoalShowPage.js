import React, { Component } from 'react'
import {Container, Row, Col, Jumbotron, Button} from 'react-bootstrap'
import Resource from './Resource'
import Task from './Task'

export default class GoalShowPage extends Component {

    state = {
        goal: ''
    }

    renderTasks = () => {
        
        if (this.state.goal !== '') {
            let rgb = `rgb(${this.state.goal.red},${this.state.goal.green},${this.state.goal.blue})`
            return this.state.goal.tasks.map(task => {
                console.log(rgb)
                return <Task rgb={rgb} id={task.id} completeTask={this.props.completeTask} completeTaskids={this.props.completeTaskids} name={task.name} description={task.description} key={task.id}/>
            })
        }

    }
    renderResources = () => {
        if (this.state.goal !== '') {
            return this.state.goal.goal_resources.map(resource => {
                return <Resource key={resource.id} name={resource.name} description={resource.description}/>
            })
        }
    }

    componentDidMount = () => {
        fetch(`http://localhost:3000/api/v1/goals/${this.props.clickedGoalid}`)
        .then(response => response.json())
        .then(goal => {
            this.setState({goal})
        })
    }

    
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Jumbotron style={{ border: `solid rgb(${this.state.goal.red},${this.state.goal.green},${this.state.goal.blue}) 4px`}}>
                            <h1>{this.state.goal.goal_name}</h1>
                            <p>{this.state.goal.goal_description}</p>
                            <p>
                                <Button variant="primary">Add Task</Button>
                                <Button variant="primary">Add Resource</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.renderTasks()}
                    </Col>
                    <Col>
                        {this.renderResources()}
                    </Col>
                </Row>
            </Container>
        )    
    }


}           
//  <div>
//                 GOAL
//                 <p>{this.state.goal_name}</p>
//                 <Link to="/add_task"><div>
//                     Add a Task
//                 </div></Link>
//                 TASKS
//                 {this.renderTasks()}
//                 <Link to="/add_resource"><div>
//                     Add a Resource
//                 </div></Link>
//                 RESOURCES
//                 {this.renderResources()}
//             </div>