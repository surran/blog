import React from 'react';
import { extractDataFromUrl } from "../utils/utils"
import { Link, withRouter} from "react-router-dom";
import Tabs from "@surran/tabs-carousel"

function CategoryTabs(props) {
  const { categories, scrollableTabs, location } = props
  const { categoryHandle } = extractDataFromUrl()
  return (<Tabs tabHandlesData = {categories}
                currentUrlHandle = {categoryHandle}
                location = {location} // so that the tabs update on every location change
                type = {scrollableTabs ? "scrollable" : "stationary"} />)

}

export default  withRouter(CategoryTabs);