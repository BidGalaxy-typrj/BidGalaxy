import Footer from "./Footer";
import HomeNav from "./HomePrimaryNav";





function Terms () {
    document.title = "BidGalaxy | Terms&Conditions"
    return (
        <div>
        <HomeNav />
            <section className="w-[1000px] mx-auto mb-20">
                <div className='textColor font-cantora text-5xl uppercase text-center font-extrabold mt-20'>Terms and Conditions</div>
                <div className='textColor font-cantora text-xl text-center mt-10'>
                    Welcome to BidGalaxy, an online auction platform dedicated to bringing you unique art and artifact pieces 
                    from around the world. By using BidGalaxy, you agree to comply with and be bound by the following terms and conditions. 
                    Please read them carefully before using our platform.
                </div>
                <div className="flex flex-col justify-start items-center gap-4">
                    <div className="textColor font-cantora text-xl mt-10">
                        <span className="text-2xl font-semibold">1. Acceptance of Terms :</span> By accessing or using BidGalaxy, you agree to be bound by these terms and conditions, 
                        as well as all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
                        from using or accessing this site.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">2. User Account:</span> To access certain features of BidGalaxy, you may be required to create an account. 
                        You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. 
                        You agree to accept responsibility for all activities that occur under your account.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">3. Product Listings :</span> BidGalaxy provides a platform for users to browse 
                        and bid on art and artifact products. We strive to provide accurate and up-to-date information about each product, 
                        including descriptions, images, and bidding details. However, we do not guarantee the accuracy, completeness, or reliability 
                        of any information on our platform.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">4. Bidding Process :</span> When you register to bid on a product, you agree to pay 
                        the specified bidding amount if you are the winning bidder. Bids are final and binding. BidGalaxy reserves the right to cancel 
                        or reject any bids at our discretion.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">5. Payment :</span> Payment for winning bids must be made in full within the specified 
                        timeframe. BidGalaxy accepts various payment methods, including credit cards, PayPal, and other online payment systems. 
                        Failure to complete payment may result in cancellation of your bid and suspension of your account.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">6. Auction Process :</span> Upon successful registration for a product, you will receive 
                        a meeting link to attend the auction. The final bidder will be determined based on the highest bid received at the end of the auction 
                        period. BidGalaxy will notify the winning bidder via email and provide instructions for payment and delivery.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">7. Product Delivery :</span> The winning bidder is responsible for providing 
                        accurate shipping information. BidGalaxy will arrange for the delivery of the product to the specified address within 
                        the designated timeframe. Additional shipping fees may apply, depending on the location and size of the product.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">8. Intellectual Property :</span> All content on BidGalaxy, including 
                        text, graphics, logos, images, audio clips, and software, is the property of BidGalaxy or its licensors and is 
                        protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content 
                        from BidGalaxy without prior written permission.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">9. Privacy Policy :</span> Your privacy is important to us. Please refer to our 
                        Privacy Policy for information on how we collect, use, and disclose your personal information.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">10. Disclaimer of Warranties :</span> BidGalaxy is provided on an "as is" and 
                        "as available" basis without any representations or warranties of any kind, express or implied. We do not warrant that 
                        BidGalaxy will be error-free, uninterrupted, or free of viruses or other harmful components.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">11. Limitation of Liability :</span> In no event shall BidGalaxy or its affiliates be 
                        liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use BidGalaxy.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">12. Governing Law :</span> These terms and conditions shall be governed by and construed 
                        in accordance with the laws, without regard to its conflict of law provisions.
                    </div>
                    <div className="textColor font-cantora text-xl">
                        <span className="text-2xl font-semibold">13. Changes to Terms :</span> BidGalaxy reserves the right to update or modify these terms 
                        and conditions at any time without prior notice. Your continued use of BidGalaxy after any such changes constitutes acceptance of the 
                        revised terms and conditions.
                    </div>
                </div>
                <div className='my-16 bg-black h-[1.5px]'></div>
                <div className="textColor font-cantora text-xl">
                    By using BidGalaxy, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. 
                    If you have any questions or concerns, please contact us at our Contact Page.
                </div>
                <div className='textColor font-cantora text-xl mt-6'>
                    Thank you for choosing BidGalaxy!
                </div>
                <div className='brand_style font-cantora text-3xl mt-1 font-extrabold'>BidGalaxy</div>
            </section>
            <Footer />
        </div>
    )
}

export default Terms;