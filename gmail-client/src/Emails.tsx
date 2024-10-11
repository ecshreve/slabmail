// src/Emails.tsx
import React, { useEffect, useState } from 'react';

const Emails: React.FC = () => {
    const [emails, setEmails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await fetch('/api/emails');
                const data = await response.json();
                setEmails(data);
                console.log("Emails: ", data);
            } catch (error) {
                console.error('Error fetching emails:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    if (loading) {
        return <div>Loading emails...</div>;
    }

    return (
        <div>
            <h1>Your Emails</h1>
            <ul>
                {emails.map((email) => (
                    <li key={email.id}>
                        <p><strong>From:</strong> {email.from}</p>
                        <p><strong>Subject:</strong> {email.subject}</p>
                        <p><strong>Snippet:</strong> {email.snippet}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Emails;
