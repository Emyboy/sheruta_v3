import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import ReportForm from './ReportForm'

export default function ReportPopupForm({ show, onClose }) {
    const [done, setDone] = useState(false);
    
    useEffect(() => {
        if(done){
            setTimeout(() => {
                onClose()
            }, 3000);
        }
    },[done])

	return (
		<Modal visible={show} closable footer={null} onCancel={onClose}>
			<ReportForm onChange={e => setDone(true)} />
		</Modal>
	)
}
