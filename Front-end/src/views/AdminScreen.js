import React, {useEffect, useState} from "react";

export default function AdminScreen(){
    return(
        <div>
            <div id="wrapper">
                <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div class="sidebar-brand-icon rotate-n-15">
                            <i class="fas fa-laugh-wink"></i>
                        </div>
                        <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                    </a>
                    <hr class="sidebar-divider my-0"></hr>
                </ul>
            </div>
        </div>
        
    )
}