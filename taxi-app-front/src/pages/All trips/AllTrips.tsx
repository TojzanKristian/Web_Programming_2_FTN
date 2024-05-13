import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { titleStyleAT, tableStyleAT, tdStyleAT } from './AllTripsCSS'

const AllTrips: React.FC = () => {


    const redirection = useNavigate();

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h3 style={titleStyleAT}>Sve vožnje u sistemu</h3>
            <table className="table table-dark table-hover" style={tableStyleAT}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vozač :</th>
                        <th scope="col">Putnik :</th>
                        <th scope="col">Početna adresa :</th>
                        <th scope="col">Krajnja adresa :</th>
                        <th scope="col">Udaljenost (km) :</th>
                        <th scope="col">Vremensko trajanje (min) :</th>
                        <th scope="col">Cena (din) :</th>
                        <th scope="col">Status :</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStyleAT}>Username1</td>
                        <td style={tdStyleAT}>Username2</td>
                        <td style={tdStyleAT}>Bulevar oslobođenja 25</td>
                        <td style={tdStyleAT}>Bulevar Evrope 155</td>
                        <td style={tdStyleAT}>5</td>
                        <td style={tdStyleAT}>10</td>
                        <td style={tdStyleAT}>250</td>
                        <td style={tdStyleAT}>Završen</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AllTrips;