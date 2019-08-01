import React, { Fragment } from 'react';
import { act } from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Items } from '..';
import { useListState } from '../useListState';

const items = [
    {
        id: '001',
        name: 'Test Product 1',
        small_image: '/test/product/1.png',
        price: {
            regularPrice: {
                amount: {
                    value: 100
                }
            }
        }
    },
    {
        id: '002',
        name: 'Test Product 2',
        small_image: '/test/product/2.png',
        price: {
            regularPrice: {
                amount: {
                    value: 100
                }
            }
        }
    }
];

const WrappedUseListState = args => {
    return <div id="hookWrapper" hook={useListState(args)} />;
};

test('renders a fragment', () => {
    const props = { items };
    const wrapper = shallow(<Items {...props} />);

    expect(wrapper.type()).toEqual(Fragment);
});

test('renders a child for each item', () => {
    const props = { items };
    const wrapper = shallow(<Items {...props} />);

    expect(wrapper.children()).toHaveLength(items.length);
});

test('renders basic children of type `renderItem`', () => {
    const elementType = 'li';
    const props = { items, renderItem: elementType };
    const wrapper = shallow(<Items {...props} />);

    expect.assertions(items.length);
    wrapper.children().forEach(node => {
        expect(
            node
                .dive()
                .dive()
                .type()
        ).toEqual(elementType);
    });
});

test('renders composite children of type `renderItem`', () => {
    const Span = () => <span />;
    const props = { items, renderItem: Span };
    const wrapper = shallow(<Items {...props} />);

    expect.assertions(items.length);
    wrapper.children().forEach(node => {
        expect(node.dive().type()).toEqual(Span);
    });
});

test('passes correct props to each child', () => {
    const elementType = 'li';
    const props = { items, renderItem: elementType };
    const wrapper = shallow(<Items {...props} />);

    wrapper.children().forEach((node, i) => {
        const item = items[i];
        const key = item.id;

        expect(node.key()).toEqual(key);
        expect(node.props()).toMatchObject({
            uniqueID: key,
            item,
            itemIndex: i,
            render: props.renderItem,
            hasFocus: false,
            isSelected: false,
            onBlur: expect.any(Function),
            updateSelection: expect.any(Function),
            setFocus: expect.any(Function)
        });
    });
});

test('uses keys generated by `getItemKey` if provided', () => {
    const identity = x => x;
    const tags = ['a', 'b', 'c'];
    const props = { items: tags, getItemKey: identity };
    const wrapper = shallow(<Items {...props} />);

    wrapper.children().forEach((node, i) => {
        expect(node.key()).toEqual(tags[i]);
    });
});

test('indicates list does not have focus and cursor set upon initialization', () => {
    const wrapper = shallow(
        <WrappedUseListState
            selectionModel="radio"
            onSelectionChange={() => {}}
        />
    );
    const {
        hook: [{ hasFocus, cursor }]
    } = wrapper.find('div').props();

    expect(cursor).toBe(null);
    expect(hasFocus).not.toBeTruthy();
});

test('updates `hasFocus` on child blur', () => {
    const wrapper = shallow(
        <WrappedUseListState
            selectionModel="radio"
            onSelectionChange={() => {}}
        />
    );
    const {
        hook: [, { removeFocus }]
    } = wrapper.find('div').props();

    removeFocus();

    const {
        hook: [{ hasFocus }]
    } = wrapper.find('div').props();

    expect(hasFocus).not.toBeTruthy();
});

test('updates `cursor` and `hasFocus` on child focus', () => {
    const wrapper = shallow(
        <WrappedUseListState
            selectionModel="radio"
            onSelectionChange={() => {}}
        />
    );
    const {
        hook: [, { setFocus }]
    } = wrapper.find('div').props();
    const expectedCursor = '002';

    setFocus(expectedCursor);

    const {
        hook: [{ cursor, hasFocus }]
    } = wrapper.find('div').props();

    expect(cursor).toEqual(expectedCursor);
    expect(hasFocus).toBeTruthy();
});

test('updates radio `selection` using updateSelection API function', () => {
    const wrapper = shallow(
        <WrappedUseListState
            selectionModel="radio"
            onSelectionChange={() => {}}
        />
    );
    let {
        hook: [{ selection }, { updateSelection }]
    } = wrapper.find('div').props();

    expect(selection.size).toBe(0);

    updateSelection('001');

    ({
        hook: [{ selection }, { updateSelection }]
    } = wrapper.find('div').props());

    expect(selection.size).toBe(1);
    expect(selection.has('001')).toBeTruthy();

    updateSelection('002');

    ({
        hook: [{ selection }, { updateSelection }]
    } = wrapper.find('div').props());

    expect(selection.size).toBe(1);
    expect(selection.has('001')).not.toBeTruthy();
    expect(selection.has('002')).toBeTruthy();
});

test('updates checkbox `selection` using updateSelection API function', () => {
    const wrapper = shallow(
        <WrappedUseListState
            selectionModel="checkbox"
            onSelectionChange={() => {}}
        />
    );
    let {
        hook: [{ selection }, { updateSelection }]
    } = wrapper.find('div').props();

    expect(selection.size).toBe(0);

    updateSelection('001');

    ({
        hook: [{ selection }, { updateSelection }]
    } = wrapper.find('div').props());

    expect(selection.size).toBe(1);
    expect(selection.has('001')).toBeTruthy();

    updateSelection('002');

    ({
        hook: [{ selection }, { updateSelection }]
    } = wrapper.find('div').props());

    expect(selection.size).toBe(2);
    expect(selection.has('001')).toBeTruthy();
    expect(selection.has('002')).toBeTruthy();
});

test.skip('calls `onSelectionChange` after updating selection', () => {
    const onSelectionChange = jest.fn();
    let wrapper;
    act(() => {
        wrapper = shallow(
            <WrappedUseListState
                selectionModel="checkbox"
                onSelectionChange={onSelectionChange}
            />
        );
    });
    const {
        hook: [, { updateSelection }]
    } = wrapper.find('div').props();

    updateSelection('001');

    const {
        hook: [{ selection }]
    } = wrapper.find('div').props();

    expect(selection.has('001')).toBeTruthy();
    expect(onSelectionChange).toHaveBeenCalledWith(selection);
});
