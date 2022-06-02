// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import DatePicker from 'react-modern-calendar-datepicker';
import '../styles/FilterBar.css'

function FilterBar({setFilterItemType}) {

    function handleSubmitItemType(e) {
        setFilterItemType(e.target.value)
    }

    return(
        <div id='filter-bar'>
            <label htmlFor='item-type'>Item Type: </label>
            <select name='item-type' onChange={handleSubmitItemType}>
                <option value=''>All Types</option>
                <option value='snowboard'>Snowboard</option>
                <option value='ski'>Skis</option>
                <option value='equipment'>Equipment</option>
            </select>
        </div>
    )
}

export default FilterBar;