import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import 'jest-localstorage-mock';
import nock from 'nock';

nock.disableNetConnect();

Enzyme.configure({
    adapter: new EnzymeAdapter()
});