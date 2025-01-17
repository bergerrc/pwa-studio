import React, { useEffect } from 'react';
import { AlertCircle, Heart, Check } from 'react-feather';
import { useIntl } from 'react-intl';

import { useToasts } from '@magento/peregrine';
import { useWishlistButton } from '@magento/peregrine/lib/talons/Wishlist/WishlistButton/useWishlistButton';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';

import defaultClasses from './wishlistButton.css';
import { arrayOf, number, shape, string } from 'prop-types';

const ErrorIcon = <Icon src={AlertCircle} attrs={{ width: 18 }} />;

const WishlistButton = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const talonProps = useWishlistButton({ itemOptions: props.itemOptions });

    const {
        addProductError,
        handleClick,
        isDisabled,
        isItemAdded
    } = talonProps;

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (addProductError) {
            addToast({
                type: 'error',
                icon: ErrorIcon,
                message: formatMessage({
                    id: 'wishlistButton.addError',
                    defaultMessage:
                        'Something went wrong adding the product to your wishlist.'
                }),
                timeout: 5000
            });
        }
    }, [addProductError, addToast, formatMessage]);

    const buttonText = isItemAdded
        ? formatMessage({
              id: 'wishlistButton.addedText',
              defaultMessage: 'Added to Favorites'
          })
        : formatMessage({
              id: 'wishlistButton.addText',
              defaultMessage: 'Add to Favorites'
          });

    let contentClass;
    let iconClass;

    if (isDisabled) {
        contentClass = classes.wishlistButtonContent_disabled;
        iconClass = classes.icon_disabled;
    } else {
        contentClass = classes.wishlistButtonContent;
        iconClass = classes.icon;
    }

    const HeartIcon = <Icon src={Heart} classes={{ icon: iconClass }} />;
    const CheckIcon = (
        <Icon src={Check} classes={{ icon: classes.checkIcon }} />
    );

    const iconElement = isItemAdded ? CheckIcon : HeartIcon;

    return (
        <div className={classes.root}>
            <button
                disabled={isDisabled}
                type="button"
                className={classes.button}
                onClick={handleClick}
            >
                <span className={contentClass}>
                    {iconElement}
                    {buttonText}
                </span>
            </button>
        </div>
    );
};

export default WishlistButton;

WishlistButton.propTypes = {
    classes: shape({
        button: string,
        checkIcon: string,
        icon: string,
        icon_disabled: string,
        root: string,
        wishlistButtonContent: string,
        wishlistButtonContent_disabled: string
    }),
    itemOptions: shape({
        entered_options: arrayOf(
            shape({
                uid: number.isRequired,
                value: string.isRequired
            })
        ),
        parent_sku: string,
        sku: string.isRequired,
        selected_options: arrayOf(string),
        quantity: number.isRequired
    })
};
