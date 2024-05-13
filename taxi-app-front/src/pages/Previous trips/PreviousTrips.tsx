import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { titleStylePT, tableStylePT, tdStylePT } from './PreviousTripsCSS'

const PreviousTrips: React.FC = () => {

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
            <h3 style={titleStylePT}>Vaše prethodne vožnje</h3>
            <table className="table table-dark table-hover" style={tableStylePT}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Početna adresa :</th>
                        <th scope="col">Krajnja adresa :</th>
                        <th scope="col">Udaljenost (km) :</th>
                        <th scope="col">Vremensko trajanje (min) :</th>
                        <th scope="col">Cena (din) :</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td style={tdStylePT}>Bulevar oslobođenja 25</td>
                        <td style={tdStylePT}>Bulevar Evrope 155</td>
                        <td style={tdStylePT}>5</td>
                        <td style={tdStylePT}>10</td>
                        <td style={tdStylePT}>250</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PreviousTrips;