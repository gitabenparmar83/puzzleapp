import React, { Component } from 'react';
import _ from 'lodash';
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
import './App.css';

const SortableItem = SortableElement(({ value }) =>
    <div className="box">{value}</div>
);

const SortableList = SortableContainer(({ items }) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value}/>
            ))}
        </div>
    );
});

class Puzzle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }


    componentDidMount() {
        if (this.props.totalBox) {
            this.generatePuzzleData(this.props.totalBox);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.totalBox !== nextProps.totalBox) {
            this.generatePuzzleData(nextProps.totalBox);
        }
    }

    generatePuzzleData = (size) => {
        let items = _.times(size * size, i => i + 1);
        this.setState({
            totalBox: size,
            solved: items,
            items: _.shuffle(items),
        });
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        }, () => {
            const { solved, items } = this.state;
            if (_.isEqual(solved, items)) {
                window.alert('welcome to the team.');
            }
        });
    };

    render() {
        return (
            <SortableList axis='xy' items={this.state.items} onSortEnd={this.onSortEnd}/>
        );
    }
}

export default Puzzle;
