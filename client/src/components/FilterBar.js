import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

function FilterBar({setFilterItemType}) {

    function handleSubmitItemType(e) {
        setFilterItemType(e.target.value)
    }

    return(
        <div className='filter-bar'>
            <label for='item-type'>Filter by Item Type: </label>
            <select name='item-type' onChange={handleSubmitItemType}>
                <option value=''>All Types</option>
                <option value='snowboard'>Snowboard</option>
                <option value='ski'>Ski</option>
                <option value='equipment'>Equipment</option>
            </select>
        </div>
    )
}

export default FilterBar;