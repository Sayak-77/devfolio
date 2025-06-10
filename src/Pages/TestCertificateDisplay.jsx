import React, { useEffect, useState } from "react"
import { db, collection } from "../firebase" // adjust path if needed
import { getDocs } from "firebase/firestore"
import Certificate from "../components/Certificate" // adjust path if needed

const TestCertificateDisplay = () => {
	const [certificates, setCertificates] = useState([])

	useEffect(() => {
		const fetchCertificates = async () => {
			try {
				const certRef = collection(db, "certificates")
				const snapshot = await getDocs(certRef)
				const certData = snapshot.docs.map(doc => doc.data().Img) // Assumes each doc has an "Img" field
				setCertificates(certData)
			} catch (error) {
				console.error("Error fetching certificates:", error)
			}
		}

		fetchCertificates()
	}, [])

	return (
		<div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
			{certificates.map((imgUrl, index) => (
				<Certificate key={index} ImgSertif={imgUrl} />
			))}
		</div>
	)
}

export default TestCertificateDisplay
