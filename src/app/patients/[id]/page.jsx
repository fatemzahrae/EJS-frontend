"use client"
import Header from "@/components/espaceMedecin/Header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "@/assets/css/style.css";
// import "@/assets/css/links.css";
// import "@/assets/css/patient.css";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";

import FeatherIcon from "feather-icons-react";

// import "@/assets/css/font-awesome.min.css";
// import "@/assets/css/customized.css";  
import {
  blogimg2,
  medalicon03,
  medalicon,
  medalicon02,
  callicon1
} from "@/components/imagepath";
import {dossier} from "@/assets/json/dumpdata_ppn";
import jsPDF from "jspdf";
import Sidebar from "@/components/espaceMedecin/Sidebar1";
import { SPRINGBOOT_API_URL } from "@/config";

export function handleGenerateDocument(){   
  const doc = new jsPDF()
  doc.text(`Date: ${dossier.date}`, 10, 10);
  doc.text(`Espace: ${dossier.location}`, 10, 20);
  doc.text(`Consultation: ${dossier.title}`, 10, 30);//(text,x,y);x and y are coordinates
  doc.text(`Motif: ${dossier.motif}`, 10, 40);
  doc.text(`Docteur: ${dossier.doctor}`, 10, 50);
  doc.text(`Ordonnance: ${dossier.info}`, 10, 60);
  doc.save(`${dossier.title}.pdf`);
}

const Patient = ({params}) => {
  const id = params.id

  const [patient, setPatient] = useState([]);
  const search = useSearchParams();
  // const {from} = router.back;
  const from = search.get('from');

  useEffect(() => {

    // console.log(search);
    // console.log('params \n'+params);
    // console.log(`id from params is ${id}`);
    if (id) {
    const accessToken = localStorage.getItem('access-token');
    const decodedAccessToken = jwtDecode(accessToken);
    console.log(`decoded token `,decodedAccessToken);
    axios.get(SPRINGBOOT_API_URL+"/jeunes/"+id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
        // .then(response => response.json()) pas besoin de conversion json pour axios ;)
        .then(data => {setPatient(data.data);console.log(data.data)})
        .catch(error => console.error('Error fetching patient:', error));
    }
  }, [id]);
  
  //OLD CODE HAS BEEN DELETED 

  return (
    
        <div className="content">
          <div className="row center-layout">
            <div className="col-sm-6 col-md-6 col-xl-5">
              <div className="blog grid-blog customized-blog">
                <div className="blog-content">
                  <div className="blog-grp-blk">
                    <div className="blog-img-blk">
                      <Link href="/blog">
                        <Image className="img-fluid" src={blogimg2} alt="#" />
                      </Link>
                      <div className="content-blk-blog ms-2 customized-subtittle">
                        <h3>
                          <Link href="/"> {patient.nom} {patient.prenom}</Link>
                        </h3>
                        <h5>{patient.sexe}, {patient.age}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="about-me-list subcontent">
                    <ul className="list-space">
                      <li>
                        <h4>NIP</h4>
                        <span>{patient.identifiantPatient}</span>
                      </li>
                      <li>
                        <h4>CIN</h4>
                        <span>{patient.cin}</span>
                      </li>
                      <li>
                        <h4>Date de Naissance</h4>
                        <span>{
                          new Date(patient.dateNaissance).toLocaleDateString('fr-FR', 
                                  {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  })
                          }
                        </span>
                      </li>
                      <li>
                        <h4>Adresse</h4>
                        <span>13 Rue Elwahda, Sale</span>
                      </li>
                      <li>
                        <h4>Adresse Email</h4>
                        <span>{patient.mail}</span>
                      </li>
                      <li>
                        <h4>Numéro de Téléphone</h4>
                        <span>{patient.numTele}</span>
                      </li>
                      <li>
                        <h4>Scolarisation</h4>
                        <span>{patient.niveauEtudesActuel != "" ? "Oui" : "Non"}</span>
                      </li>
                      <li>
                        <h4>Niveau d&apos;etude</h4>
                        <span>{patient.niveauEtudesActuel}</span>
                      </li>
                      <li>
                        <h4>CNE</h4>
                        <span>{patient.cne}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="doctor-personals-grp">
                <div className="card">
                  <div className="card-body">
                    {/* <div className="heading-detail">
                      <h4>Speciality</h4>
                    </div> */}
                    <Link href={`./${id}/consultation`}  className="personal-activity">
                      <div className="personal-icons status-grey">
                        <Image src={medalicon} alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Consultation</h4>
                        <h5>Ajouter Une Nouvelle Consultation </h5>
                      </div>
                    </Link>
                    <Link href={`./${id}/historique/`} className="personal-activity">
                      <div className="personal-icons status-green">
                        <Image src={medalicon02} alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Historique</h4>
                        <h5>L&#39;historique de Consultation</h5>
                      </div>
                    </Link>
                    <Link href="../TeleExpertise" className="personal-activity">
                      <div className="personal-icons status-blue">
                        <Image src={callicon1} alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>TeleExpertise</h4>
                        <h5>Se Mettre en Contact</h5>
                      </div>
                    </Link>
                    
                    <div className="personal-activity generate mb-0"
                      onClick={handleGenerateDocument}
                    >
                      <div className="personal-icons status-orange">
                        <Image src={medalicon03} alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Compte Rendu</h4>
                        <h5>Generer son Compte Rendu</h5>
                      </div>
                    </div >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Patient;