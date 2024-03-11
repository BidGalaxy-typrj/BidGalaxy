import React from 'react';
import Footer from './Footer';
import HomeNav from './HomePrimaryNav';

function PrivatePolicy() {

    document.title = "BidGalaxy | PrivatePolicy";
    return (
        <div className="wrapper">
            <HomeNav />
            <section className='w-[1000px] mx-auto mb-20'>
                <div className='textColor font-cantora text-5xl uppercase text-center font-extrabold mt-20'>Privacy policy</div>
                <div className='textColor font-cantora text-xl text-center mt-10'>Welcome to BidGalaxy, an online auction platform where users can browse, register, and participate in auctions 
                for art and artifacts. This Privacy Policy outlines how we collect, use, share, and protect your personal information when you 
                use our Website.</div>
                <div className='textColor font-cantora text-2xl text-start mt-10 underline font-semibold'>
                    1. Information We Collect
                </div>
                <div className='textColor font-cantora text-xl text-start mt-3'>
                    We may collect various types of personal information from you, including:
                </div>
                <div className='textColor font-cantora text-xl text-start mt-3'>
                    <ul className='disc-list'>
                        <li>Name: This refers to the full name of the user.</li>
                        <li>Email address: The email address provided by the user.</li>
                        <li>Contact details: This includes phone numbers, addresses, or any other contact information provided by the user.</li>
                        <li>Payment information: Any details related to the payment method used by the user, such as credit card numbers or billing addresses.</li>
                        <li>IP address: The IP address from which the user accesses the website.</li>
                        <li>Browser type: Information about the web browser used by the user, such as Chrome, Firefox, Safari, etc.</li>
                        <li>Device information: Details about the user's device, including model, operating system, and screen resolution.</li>
                    </ul>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        2. How We Use Your Information
                    </div>
                    <div className='textColor font-cantora text-xl'>
                        We use the information we collect for the following purposes:
                    </div>
                    <div className='textColor font-cantora text-xl'>
                        <ul className='disc-list'>
                            <li>Processing registrations and facilitating auctions</li>
                            <li>Managing user accounts and communications</li>
                            <li>Improving our services and user experience</li>
                            <li>Ensuring legal and regulatory compliance</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        3. Sharing of Information
                    </div>
                    <div className='textColor font-cantora text-xl'>
                        We may share your personal information with third parties in the following circumstances:
                    </div>
                    <div className='textColor font-cantora text-xl'>
                        <ul className='disc-list'>
                            <li>With payment processors and shipping companies to fulfill transactions.</li>
                            <li>For legal or regulatory compliance purposes.</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        4. User Rights
                    </div>
                    <div className='textColor font-cantora text-xl'>
                        You have the right to access, correct, or delete your personal information. Please contact us using the information provided below to exercise your rights.
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        5. Security Measures
                    </div>
                    <div className='textColor font-cantora text-xl'>
                    We implement security measures to protect your personal information from unauthorized access, use, or disclosure.
                     These measures include encryption, access controls, and regular security assessments.
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        6. Cookies and Tracking
                    </div>
                    <div className='textColor font-cantora text-xl'>
                    We use cookies and similar tracking technologies to enhance your browsing experience and analyze website usage. By using our Website, 
                    you consent to the use of cookies as described in our Cookie Policy.
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        7. Third-Party Links
                    </div>
                    <div className='textColor font-cantora text-xl'>
                    Our Website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. 
                    We recommend reviewing the privacy policies of linked websites before providing any personal information.
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        8. Children's Privacy
                    </div>
                    <div className='textColor font-cantora text-xl'>
                        Our Website is not intended for individuals under a certain age as specified by applicable laws. 
                        We do not knowingly collect personal information from children without parental consent.
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        9. Updates to the Privacy Policy
                    </div>
                    <div className='textColor font-cantora text-xl'>
                    We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting the updated 
                    policy on our Website. 
                    We encourage you to review this Privacy Policy periodically for any updates.
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        10. Contact Us
                    </div>
                    <div className='textColor font-cantora text-xl'>
                        If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at our Contact Us Page.
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='textColor font-cantora text-2xl mt-10 underline font-semibold'>
                        11. Legal Basis
                    </div>
                    <div className='textColor font-cantora text-xl'>
                        The processing of your personal information is based on your consent, our legitimate interests in providing and improving our services, 
                        and compliance with legal and regulatory requirements.
                    </div>
                </div>
                <div className='my-16 bg-black h-[1.5px]'></div>
                <div className='textColor font-cantora text-xl'>
                    This Privacy Policy is intended to provide you with a clear understanding of how we handle your personal information. 
                    By using our Website, you agree to the terms outlined in this Privacy Policy. 
                    If you do not agree with any aspect of this policy, please refrain from using our services.
                </div>
                <div className='textColor font-cantora text-xl mt-5'>
                    Thank you for choosing BidGalaxy!
                </div>
                <div className='brand_style font-cantora text-3xl mt-1 font-extrabold'>
                    BidGalaxy
                </div>
            </section>
            <Footer />
        </div>
      );
}

export default PrivatePolicy;